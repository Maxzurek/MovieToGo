import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from 'semantic-ui-react';
import routes from './routeConfig';
import { Claim } from './models/authentication.models';
import AuthenticationContext from './components/contexts/AuthenticationContext';
import MainNavbar from './components/navigation/MainNavbar';
import { useEffect, useState } from 'react';
import { getClaims } from './components/authentication/handleJWT';
import ModalContext from './components/contexts/ModalContext';
import AuthenticationModal from './components/modals/AuthenticationModal';
import OkMessageModal from './components/modals/OkMessageModal';
import configureInterceptor from './components/authentication/httpInterceptor';
import { TheMovieDbDTO, MovieToGoDTO, GenresDTO } from './models/movie.models';
import { WatchListDTO } from './models/watchlist.models';
import axios from 'axios';
import { theMovieDbTrendingDaily, theMovieDbPopulars, theMovieDbInTheater, movieToGoUrlWatchListsUser, movieToGoUrlMovies, movieToGoUrlMovieVotesByMovieId, theMovieDbGenres } from './endpoints';
import AppDataContext from './components/contexts/AppDataContext';
import { useStateIfMounted } from 'use-state-if-mounted';
import RedirectionPage from './components/navigation/RedirectionPage';
import { adminRole } from './roles';

configureInterceptor();

export default function App() {

  const [claims, setClaims] = useState<Claim[]>(getClaims);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isOkMessageModalOpen, setOkMessageModalOpen] = useState(false);
  const [okMessageModalContent, setOkMessageModalContent] = useState('');

  const [genresDTO, setGenresDTO] = useStateIfMounted<GenresDTO[]>([]);
  const [trendingTheMovieDbDTO, setTrendingTheMovieDbDTO] = useStateIfMounted<TheMovieDbDTO[]>([]);
  const [trendingMovieToGoDTO, setTrendingMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
  const [popularTheMovieDbDTO, setPopularTheMovieDbDTO] = useStateIfMounted<TheMovieDbDTO[]>([]);
  const [popularMovieToGoDTO, setPopularMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
  const [inTheatersTheMovieDbDTO, setInTheatersTheMovieDbDTO] = useStateIfMounted<TheMovieDbDTO[]>([]);
  const [inTheatersMovieToGoDTO, setInTheatersMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
  const [userWatchListDTO, setUserWatchListDTO] = useStateIfMounted<WatchListDTO[] | undefined>(undefined);
  const [isLoadingData, setLoadingData] = useStateIfMounted(true);

  useEffect(() => {
    if (okMessageModalContent) {
      setOkMessageModalOpen(true);
    }
  }, [okMessageModalContent])

  useEffect(() => {

    setLoadingData(true);

    const getGenresList = async () => {

      await axios.get(theMovieDbGenres)

        .then((response) => {
          setGenresDTO(response.data.genres)
        })
        .catch(error => console.log(error))
    }

    const fetchData = async () => {

      const requestOne = axios.get(theMovieDbTrendingDaily);
      const requestTwo = axios.get(theMovieDbPopulars);
      const requestThree = axios.get(theMovieDbInTheater);

      try {

        await axios.all([requestOne, requestTwo, requestThree])
          .then(axios.spread(async (...responses) => {

            let trendingMovies = responses[0].data.results
            let popularMovies = responses[1].data.results
            let inTheatersMovies = responses[2].data.results

            setTrendingTheMovieDbDTO(trendingMovies)
            setPopularTheMovieDbDTO(popularMovies)
            setInTheatersTheMovieDbDTO(inTheatersMovies)

            await createMovieToGoMovie(trendingMovies)
              .then(async (response) => {
                setTrendingMovieToGoDTO(response);
                await createMovieToGoMovie(popularMovies)
                  .then(async (response) => {
                    setPopularMovieToGoDTO(response)
                    await createMovieToGoMovie(inTheatersMovies)
                      .then(async (response) => {
                        setInTheatersMovieToGoDTO(response)

                        if (claims.length > 0) {
                          await axios.get(movieToGoUrlWatchListsUser)
                            .then(response => {
                              setUserWatchListDTO(response.data)
                              setLoadingData(false);
                            })
                        }
                        else {
                          setLoadingData(false);
                        }
                      })
                  })
              })
          }))

      }
      catch (error) {
        // TODO useState for the error, diplay an error to the UI ?
        setLoadingData(false)
      }

    }

    getGenresList();
    fetchData();

  }, [claims])

  const createMovieToGoMovie = async (movies: TheMovieDbDTO[]): Promise<MovieToGoDTO[]> => {

    let movieToGoDTOs: MovieToGoDTO[] = [];

    await Promise.all(movies.map(async (movie, index) => {

      let movieCreationDTO = { TheMovieDbId: movie.id };

      await axios.post(movieToGoUrlMovies, movieCreationDTO)
        .then(async (response) => {

          var movieToGoDTO: MovieToGoDTO = response.data;

          if (claims.length > 0) {
            await axios.get(movieToGoUrlMovieVotesByMovieId + `/${movieToGoDTO.id}`)
              .then((response) => {

                let movieVoteDTO = response.data;

                if (movieVoteDTO === "") {
                  movieVoteDTO = undefined;
                }

                movieToGoDTO.movieVote = movieVoteDTO;
              })
              .catch((error) => {
                console.log(error);
              })
          }
            
          movieToGoDTOs[index] = movieToGoDTO;
        })
    }))

    return movieToGoDTOs;
  }

  const isAdmin = () => {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === adminRole) > -1;
  }

  function getElement(requiredRole: string, componentToRender: JSX.Element) {
    if (requiredRole.length === 0) {
      return componentToRender;
    }
    if (requiredRole === adminRole && isAdmin()) {
      return componentToRender;
    }

    return <RedirectionPage />;
  }

  return (
    <BrowserRouter>
      <AppDataContext.Provider
        value={{
          genresDTO,
          setGenresDTO: setGenresDTO,
          trendingTheMovieDbDTO,
          setTrendingTheMovieDbDTO: setTrendingTheMovieDbDTO,
          trendingMovieToGoDTO,
          setTrendingMovieToGoDTO: setTrendingMovieToGoDTO,
          popularTheMovieDbDTO,
          setPopularTheMovieDbDTO: setPopularTheMovieDbDTO,
          popularMovieToGoDTO,
          setPopularMovieToGoDTO: setPopularMovieToGoDTO,
          inTheatersTheMovieDbDTO,
          setInTheatersTheMovieDbDTO: setInTheatersTheMovieDbDTO,
          inTheatersMovieToGoDTO,
          setInTheatersMovieToGoDTO: setInTheatersMovieToGoDTO,
          userWatchListDTO,
          setUserWatchListDTO: setUserWatchListDTO,
          isLoadingData,
          setLoadingData: setLoadingData
        }}
      >
        <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
          <ModalContext.Provider
            value={{
              isAuthModalOpen,
              setAuthModalOpen: setAuthModalOpen,
              isOkMessageModalOpen,
              setOkMessageModalOpen: setOkMessageModalOpen,
              okMessageModalContent,
              setOkMessageModalContent: setOkMessageModalContent,
              displayAuthenticationModal: setAuthModalOpen,
              displayOkMessage: setOkMessageModalContent,
            }}
          >
            <MainNavbar />
            <Container fluid>
              <Routes>
                {routes.map(route =>
                  <Route
                    key={route.path}
                    path={route.path}
                    element={getElement(route.requiredRole, route.component)}>
                  </Route>)}
              </Routes>
            </Container>
            <AuthenticationModal open={isAuthModalOpen} setOpen={setAuthModalOpen} defaultSelection="login" />
            <OkMessageModal message={okMessageModalContent} setMessage={setOkMessageModalContent} open={isOkMessageModalOpen} setOpen={setOkMessageModalOpen} />
          </ModalContext.Provider>
        </AuthenticationContext.Provider>
      </AppDataContext.Provider>
    </BrowserRouter>
  )
};

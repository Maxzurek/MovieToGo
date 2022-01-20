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
import { TheMovieDbDTO, MovieToGoDTO } from './models/movie.models';
import { WatchListDTO } from './models/watchlist.models';
import axios from 'axios';
import { theMovieDbTrendingDaily, theMovieDbPopulars, theMovieDbInTheater, movieToGoUrlWatchListsUser, movieToGoUrlMovies, movieToGoUrlMovieVotesByMovieId } from './endpoints';
import AppDataContext from './components/contexts/AppDataContext';

configureInterceptor();

export default function App() {

  const [claims, setClaims] = useState<Claim[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isOkMessageModalOpen, setOkMessageModalOpen] = useState(false);
  const [okMessageModalContent, setOkMessageModalContent] = useState('');

  const [trendingTheMovieDbDTO, setTrendingTheMovieDbDTO] = useState<TheMovieDbDTO[]>([]);
  const [trendingMovieToGoDTO, setTrendingMovieToGoDTO] = useState<MovieToGoDTO[]>([]);
  const [popularTheMovieDbDTO, setPopularTheMovieDbDTO] = useState<TheMovieDbDTO[]>([]);
  const [popularMovieToGoDTO, setPopularMovieToGoDTO] = useState<MovieToGoDTO[]>([]);
  const [inTheatersTheMovieDbDTO, setInTheatersTheMovieDbDTO] = useState<TheMovieDbDTO[]>([]);
  const [inTheatersMovieToGoDTO, setInTheatersMovieToGoDTO] = useState<MovieToGoDTO[]>([]);
  const [userWatchListDTO, setUserWatchListDTO] = useState<WatchListDTO[] | undefined>(undefined);
  const [isLoadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setClaims(getClaims);
  }, [])

  useEffect(() => {
    if (okMessageModalContent) {
      setOkMessageModalOpen(true);
    }
  }, [okMessageModalContent])

  useEffect(() => {

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

            await creatMovieToGoMovie(trendingMovies)
              .then(async (response) => {
                setTrendingMovieToGoDTO(response);
                await creatMovieToGoMovie(popularMovies)
                  .then(async (response) => {
                    setPopularMovieToGoDTO(response)
                    await creatMovieToGoMovie(inTheatersMovies)
                      .then(async (response) => {
                        setInTheatersMovieToGoDTO(response)
                        await axios.get(movieToGoUrlWatchListsUser)
                          .then(response => {
                            setUserWatchListDTO(response.data)
                            setLoadingData(false);
                          })
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

    fetchData();

  }, [])

  const creatMovieToGoMovie = async (movies: TheMovieDbDTO[]): Promise<MovieToGoDTO[]> => {

    let movieToGoDTOs: MovieToGoDTO[] = [];

    await Promise.all(movies.map(async (movie, index) => {

      let movieCreationDTO = { TheMovieDbId: movie.id };

      await axios.post(movieToGoUrlMovies, movieCreationDTO)
        .then(async (response) => {

          var movieToGoDTO: MovieToGoDTO = response.data;

          await axios.get(movieToGoUrlMovieVotesByMovieId + `/${movieToGoDTO.id}`)
            .then((response) => {

              let movieVoteDTO = response.data;

              if (movieVoteDTO === "") {
                movieVoteDTO = undefined;
              }

              movieToGoDTO.movieVote = movieVoteDTO;
              movieToGoDTOs[index] = (movieToGoDTO);
            })
            .catch(error => { return movieToGoDTOs })
        })
    }))

    return movieToGoDTOs;
  }

  const isAdmin = () => {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  function getElement(requiredRole: string, componentToRender: JSX.Element) {
    if (requiredRole.length === 0) {
      return componentToRender;
    }
    if (requiredRole === 'admin' && isAdmin()) {
      return componentToRender;
    }

    return <h1>Unauthorized : You are not allowed to see this page. Please log in first.</h1>;
  }

  return (
    <BrowserRouter>
      <AppDataContext.Provider 
        value={{
          trendingTheMovieDbDTO,
          setTrendingTheMovieDbDTO: setTrendingTheMovieDbDTO,
          trendingMovieToGoDTO,
          setTrendingMovieToGoDTO: setTrendingMovieToGoDTO,
          popularTheMovieDbDTO,
          setPopularTheMovieDbDTO: setPopularTheMovieDbDTO,
          popularMovieToGoDTO,
          setPopularMovieToGoDTO : setPopularMovieToGoDTO,
          inTheatersTheMovieDbDTO,
          setInTheatersTheMovieDbDTO: setInTheatersTheMovieDbDTO,
          inTheatersMovieToGoDTO,
          setInTheatersMovieToGoDTO: setInTheatersMovieToGoDTO,
          userWatchListDTO,
          setUserWatchListDTO : setUserWatchListDTO,
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

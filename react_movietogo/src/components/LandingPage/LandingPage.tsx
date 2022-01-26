import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Divider, Loader, Segment } from "semantic-ui-react";
import { useStateIfMounted } from "use-state-if-mounted";
import { theMovieDbTrendingDaily, theMovieDbPopulars, theMovieDbInTheater, movieToGoUrlMovies, movieToGoUrlMovieVotesByMovieId } from "../../endpoints";
import { TheMovieDbDTO, MovieToGoDTO } from "../../models/movie.models";
import { getClaims } from "../authentication/handleJWT";
import AppDataContext from "../contexts/AppDataContext";
import MovieCards from "./MovieCards";

export default function LandingPage() {

    const { userWatchListDTO } = useContext(AppDataContext);

    const [trendingTheMovieDbDTO, setTrendingTheMovieDbDTO] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [trendingMovieToGoDTO, setTrendingMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [popularTheMovieDbDTO, setPopularTheMovieDbDTO] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [popularMovieToGoDTO, setPopularMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [inTheatersTheMovieDbDTO, setInTheatersTheMovieDbDTO] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [inTheatersMovieToGoDTO, setInTheatersMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);

    const [isLoadingData, setLoadingData] = useStateIfMounted(true);

    const location = useLocation();

    useEffect(() => {

        fetchData();

    }, [location.key])

    const fetchData = async () => {

        setLoadingData(true);

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
                                            setLoadingData(false);
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

    const createMovieToGoMovie = async (movies: TheMovieDbDTO[]): Promise<MovieToGoDTO[]> => {

        let movieToGoDTOs: MovieToGoDTO[] = [];

        await Promise.all(movies.map(async (movie, index) => {

            let movieCreationDTO = { TheMovieDbId: movie.id };

            await axios.post(movieToGoUrlMovies, movieCreationDTO)
                .then(async (response) => {

                    var movieToGoDTO: MovieToGoDTO = response.data;

                    if (getClaims().length > 0) {
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

    const renderCards = () => {
        return (
            <>
                <MovieCards
                    title='Trending Movies'
                    theMovieDbDTO={trendingTheMovieDbDTO}
                    movieToGoDTO={trendingMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />

                <Divider />

                <MovieCards
                    title='Popular Movies'
                    theMovieDbDTO={popularTheMovieDbDTO}
                    movieToGoDTO={popularMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />

                <Divider />

                <MovieCards
                    title='In Theaters'
                    theMovieDbDTO={inTheatersTheMovieDbDTO}
                    movieToGoDTO={inTheatersMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />
            </>
        )
    }

    return (

        <Container fluid textAlign="left">
            <Loader active={isLoadingData} />
            {isLoadingData ? undefined : renderCards()}
        </Container>
    )
};
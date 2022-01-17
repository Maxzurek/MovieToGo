import axios from "axios";
import { useEffect, useState, } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStateIfMounted } from "use-state-if-mounted";

import { movieToGoUrlMovies, movieToGoUrlWatchListsUser, theMovieDbInTheater, theMovieDbPopulars, theMovieDbTrendingDaily } from "../../endpoints";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import MovieCards from "../utilities/MovieCards";



export default function LandingPage() {

    const [tredingMovies, setTredingMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [tredingmovieToGoDTO, setTredingMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [popularMovies, setPopularMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [popularmovieToGoDTO, setPopularMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [theaterMovies, setTheaterMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [theatermovieToGoDTO, setTheaterMovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [watchListDTO, setWatchListDTO] = useStateIfMounted<WatchListDTO[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            const userWatchLists = axios.get(movieToGoUrlWatchListsUser);
            const requestTwo = axios.get(theMovieDbTrendingDaily);
            const requestThree = axios.get(theMovieDbPopulars);
            const requestFour = axios.get(theMovieDbInTheater);

            await axios.all([userWatchLists, requestTwo, requestThree, requestFour])
                .then(axios.spread(async (...responses) => {

                    let userWatchList = responses[0].data
                    let trendingMovies = responses[1].data.results
                    let popularMovies = responses[2].data.results
                    let inTheatersMovies = responses[3].data.results

                    setWatchListDTO(userWatchList)
                    setTredingMovies(trendingMovies)
                    setPopularMovies(popularMovies)
                    setTheaterMovies(inTheatersMovies)

                    await creatMovieToGoMovie(trendingMovies)
                        .then(async (response) => {
                            setTredingMovieToGoDTO(response);
                            await creatMovieToGoMovie(popularMovies)
                                .then(async (response) => {
                                    setPopularMovieToGoDTO(response)
                                    await creatMovieToGoMovie(inTheatersMovies)
                                        .then(async (response) => {
                                            setTheaterMovieToGoDTO(response)
                                            setIsLoading(false);
                                        })
                                })
                        })
                }))
        }

        fetchData();
    }, [])

    const creatMovieToGoMovie = async (movies: TheMovieDbDTO[]): Promise<MovieToGoDTO[]> => {

        let movieToGoDTOs: MovieToGoDTO[] = [];
        console.log("Creating MovieToGo Movies");

        await Promise.all(movies.map(async (movie, index) => {

            let movieCreationDTO = { TheMovieDbId: movie.id };

            await axios.post(movieToGoUrlMovies, movieCreationDTO)
                .then(response => {
                    movieToGoDTOs[index] = (response.data)
                })
        }))

        return movieToGoDTOs;
    }

    const renderCards = () => {
        return (
            <>
                <Segment color="teal" inverted>
                    <Header textAlign="center" size="huge">
                        Movies Trending
                    </Header>
                </Segment>
                <MovieCards
                    theMovieDbDTO={tredingMovies}
                    movieToGoDTO={tredingmovieToGoDTO}
                    watchListDTO={watchListDTO}
                />

                <Segment color="grey" inverted>
                    <Header textAlign="center" size="huge">
                        Movies Popular
                    </Header>
                </Segment>

                <MovieCards
                    theMovieDbDTO={popularMovies}
                    movieToGoDTO={popularmovieToGoDTO}
                    watchListDTO={watchListDTO}
                />

                <Segment color="brown" inverted>
                    <Header textAlign="center" size="huge">
                        Movies In theater
                    </Header>
                </Segment>

                <MovieCards
                    theMovieDbDTO={theaterMovies}
                    movieToGoDTO={theatermovieToGoDTO}
                    watchListDTO={watchListDTO}
                />
            </>
        )
    }

    return (

        <Container fluid textAlign="left">
            {isLoading ? undefined : renderCards()}
        </Container>
    )
};




import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStateIfMounted } from "use-state-if-mounted";

import { movieToGoUrlMovies, theMovieDbInTheater, theMovieDbPopulars, theMovieDbTrendingDaily } from "../../endpoints";
import { MovieCreationDTO, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import MovieCards from "../utilities/MovieCards";




export default function LandingPage() {

    const [tredingMovies, setTredingMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [tredingmovieToGoDTO, setTredingmovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [popularMovies, setPopularMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [popularmovieToGoDTO, setPopularmovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [theaterMovies, setTheaterMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [theatermovieToGoDTO, setTheatermovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {

        getMoviesDbApi(theMovieDbTrendingDaily, setTredingmovieToGoDTO, setTredingMovies);
        getMoviesDbApi(theMovieDbPopulars, setPopularmovieToGoDTO, setPopularMovies);
        getMoviesDbApi(theMovieDbInTheater, setTheatermovieToGoDTO, setTheaterMovies);
    }, [])

    useEffect(() => {

    }, [])

    const getMoviesDbApi = async (urlMovieDb: string,
        setMovieToGo: React.Dispatch<React.SetStateAction<MovieToGoDTO[]>>,
        setMovieDb: React.Dispatch<React.SetStateAction<TheMovieDbDTO[]>>) => {

        await axios.get(urlMovieDb)
            .then(response => {

                var results = response.data.results;
                setError(undefined);
                setMovieDb([]);
                setMovieToGo([])
                setMovieDb(results);


                results.map(async (result: any) => {

                    await createMovieToGoMovie(result.id)
                        .then(response => {
                            setMovieToGo((oldResult) => [...oldResult, response])
                        })
                })
            })
            .catch(error => {
                let axiosError = error as AxiosError;
                setError(axiosError);
                console.log(axiosError)
            });
    }


    const createMovieToGoMovie = async (id: number): Promise<MovieToGoDTO> => {

        let movieCreationDTO: MovieCreationDTO = { theMovieDbId: id }

        let movieToGoDTO: MovieToGoDTO = {
            id: 0,
            theMovieDbId: 0,
            voteAverage: 0,
            voteCount: 0,
            movieReviews: undefined
        }

        await axios.post(movieToGoUrlMovies, movieCreationDTO)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                let axiosError = error as AxiosError;
                setError(axiosError);
                throw new Error();
            });

        return movieToGoDTO;
    }

    return (

        <Container fluid textAlign="left">
            <Segment color="teal" inverted>
                <Header textAlign="center" size="huge">
                    Movies Trending
                </Header>
            </Segment>
            <MovieCards theMovieDbDTO={tredingMovies}
                movieToGoDTO={tredingmovieToGoDTO} />

            <Segment color="grey" inverted>
                <Header textAlign="center" size="huge">
                    Movies Popular
                </Header>
            </Segment>

            <MovieCards theMovieDbDTO={popularMovies}
                movieToGoDTO={popularmovieToGoDTO} />

            <Segment color="brown" inverted>
                <Header textAlign="center" size="huge">
                    Movies In theater
                </Header>
            </Segment>

            <MovieCards theMovieDbDTO={theaterMovies}
                movieToGoDTO={theatermovieToGoDTO} />
        </Container>
    )
};


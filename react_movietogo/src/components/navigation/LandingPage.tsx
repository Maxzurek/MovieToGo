import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { theMovieDbInTheater, theMovieDbPopulars, theMovieDbTrendingDaily } from "../../endpoints";
import { movieCardDTO } from "../../models/movie.models";
import MovieCards from "../utilities/MovieCards";

export default function LandingPage() {

    const [tredingMovies, setTredingMovies] = useState<movieCardDTO[]>([]);
    const [popularMovies, setPopularMovies] = useState<movieCardDTO[]>([]);
    const [theaterMovies, setTheaterMovies] = useState<movieCardDTO[]>([]);

    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        getTredingMovies();
         getPopularMovies();
         getTheaterMovies();

    }, [])

    const getTredingMovies = async () => {
        try {
            const response = await axios.get(theMovieDbTrendingDaily);
            setTredingMovies(response.data.results);
            console.log(tredingMovies);
        } catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
            console.log(axiosError)
        }
    }

    const getPopularMovies = async () => {
        try {
            const response = await axios.get(theMovieDbPopulars);
            setPopularMovies(response.data.results);
            console.log(popularMovies);
        } catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
            console.log(axiosError)
        }
    }

    const getTheaterMovies = async () => {
        try {
            const response = await axios.get(theMovieDbInTheater);
            setTheaterMovies(response.data.results);
            console.log(theaterMovies);
        } catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
            console.log(axiosError)
        }
    }

    return (

        <Container fluid textAlign="left">
            <Segment color="teal" inverted>
                <Header textAlign="center" size="huge">
                    Movies Trending
                </Header>
            </Segment>
            <MovieCards movies={tredingMovies} />

              <Segment color="grey" inverted>
                <Header textAlign="center" size="huge">
                    Movies Popular
                </Header>
            </Segment>

            <MovieCards movies={popularMovies} /> 

          <Segment color="brown" inverted>
                <Header textAlign="center" size="huge">
                    Movies In theater
                </Header>
            </Segment>

            <MovieCards movies={theaterMovies} /> 
        </Container>
    )
};

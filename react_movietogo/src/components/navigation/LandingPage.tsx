import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Container, Header, Segment } from "semantic-ui-react";

import { movieToGoUrlMovies, theMovieDbImages, theMovieDbInTheater, theMovieDbPopulars, theMovieDbTrendingDaily } from "../../endpoints";
import {  MovieCreationDTO, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import MovieCards from "../utilities/MovieCards";




export default function LandingPage() {

    const [tredingMovies, setTredingMovies] = useState<TheMovieDbDTO[]>([]);
    const [tredingmovieToGoDTO, setTredingmovieToGoDTO] = useState<MovieToGoDTO[]>([]);
    const [popularMovies, setPopularMovies] = useState<TheMovieDbDTO[]>([]);
    const [popularmovieToGoDTO, setPopularmovieToGoDTO] = useState<MovieToGoDTO[]>([]);
    const [theaterMovies, setTheaterMovies] = useState<TheMovieDbDTO[]>([]);
    const [theatermovieToGoDTO, setTheatermovieToGoDTO] = useState<MovieToGoDTO[]>([]);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        getMoviesDbApi(theMovieDbTrendingDaily,setTredingmovieToGoDTO,setTredingMovies);
        getMoviesDbApi(theMovieDbPopulars,setPopularmovieToGoDTO,setPopularMovies);
        getMoviesDbApi(theMovieDbInTheater,setTheatermovieToGoDTO,setTheaterMovies);

    }, [])

    const getMoviesDbApi = async (urlMovieDb : string,
          setMovieToGo :  React.Dispatch<React.SetStateAction<MovieToGoDTO[]>>, 
          setMovieDb: React.Dispatch<React.SetStateAction<TheMovieDbDTO[]>> ) => {
              
        try {
            const response = await axios.get(urlMovieDb);
            setError(undefined);
            setMovieDb([]);
            setMovieToGo([])
            var results = response.data.results;
            setMovieDb(results);
            console.log(results);

            results.map(async (result: any) => {
                let movieToGoDTO = await createMovieToGoMovie(result.id);
                setMovieToGo((oldResult) => [...oldResult, movieToGoDTO])})

        } catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
            console.log(axiosError)
        }
    }

 
    const createMovieToGoMovie = async (id: number) => {

        let movieCreationDTO: MovieCreationDTO = { theMovieDbId: id }

        try {
            let response = await axios.post(movieToGoUrlMovies, movieCreationDTO);
            return response.data;
        }
        catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
        }
    }
    return (

        <Container fluid textAlign="left">
            <Segment color="teal" inverted>
                <Header textAlign="center" size="huge">
                    Movies Trending
                </Header>
            </Segment>
            <MovieCards theMovieDbDTO={tredingMovies} 
                        movieToGoDTO = {tredingmovieToGoDTO}/>

            <Segment color="grey" inverted>
                <Header textAlign="center" size="huge">
                    Movies Popular
                </Header>
            </Segment>

            <MovieCards theMovieDbDTO={popularMovies}
                        movieToGoDTO = {popularmovieToGoDTO} />

            <Segment color="brown" inverted>
                <Header textAlign="center" size="huge">
                    Movies In theater
                </Header>
            </Segment>

            <MovieCards theMovieDbDTO={theaterMovies} 
                     movieToGoDTO = {theatermovieToGoDTO}/>
        </Container>
    )
};



import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { movieToGoUrlMovies } from "../../endpoints";
import { MovieDTO, MovieReviewDTO } from "../../models/movie.models";
import GenericDataTable from "../utilities/GenericDataTable";

export default function DatabaseTool() {

    const [moviesData, setMoviesData] = useState<MovieDTO[]>([]);
    const [moviesErrors, setMoviesErrors] = useState<any>({});

    const [movieReviewsData, setMovieReviewsData] = useState<MovieReviewDTO[]>([]);
    const [movieReviewErrors, setMovieReviewErrors] = useState<any>({});

    useEffect(() => {

        async function getMoviesData() {
            try {
                const response = await axios.get(movieToGoUrlMovies);
                setMoviesData(response.data);
            } catch (error: any) {
                setMoviesErrors(error);
            }
        }

        getMoviesData();

    }, [])
    
    return (
        <Container>
            <Container textAlign="center">
                <h1>Database Tool</h1>
            </Container>
            <GenericDataTable tableName="Movies" color="purple" data={moviesData} apiErrors={moviesErrors}/>
        </Container>
    )
};

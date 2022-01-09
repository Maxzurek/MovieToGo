import axios from "axios";
import { useState, useEffect } from "react";
import { movieToGoUrlMovies } from "../../endpoints";
import { MovieDTO } from "../../models/movies.models";
import GenericDataTable from "../utilities/GenericDataTable";

interface TableMoviesProps{

}

export default function TableMovies(props: TableMoviesProps) {

    const [moviesData, setMoviesData] = useState<MovieDTO[]>([]);
    const [errors, setErrors] = useState('');

    useEffect(() => {

        async function getMoviesData() {
            try {
                const response = await axios.get(movieToGoUrlMovies);
                console.log(response.data);
                setMoviesData(response.data);
            } catch (error : any) {
                setErrors(error.message);
            }
        }

        getMoviesData();

    }, [])

    return(
        <GenericDataTable tableName="Movies" color="purple" data={moviesData} />
    )
};

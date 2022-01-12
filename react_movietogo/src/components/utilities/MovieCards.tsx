import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { theMovieDbPopulars, theMovieDbTrendingDaily } from "../../endpoints";
import IndividualMovie from "./IndividualMovie";
import {Grid } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";

export default function MovieCards() {

    const [error, setError] = useState<AxiosError>();
    const [data, setData] = useState([]);

    useEffect(() => {
        getMovieData();
        
    }, [])

    const getMovieData = async () => {
        try {
            const response = await axios.get(theMovieDbTrendingDaily);
            
            setData(response.data.results);
            console.log(data);
   
        } catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
            console.log(axiosError)
        }

    }
    return (
        <>

            <Grid  columns={4} container doubling stackable>
                {data.map((movie, index) =>
                    <Grid.Column>
                        <IndividualMovie movie={movie} key={index} />
                    </Grid.Column>
                )}
            </Grid>
        </>

    )
}




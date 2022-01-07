import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, GridRow, GridColumn, Message } from "semantic-ui-react";
import { movieToGoUrlGenres, theMovieDbGenres } from "../../endpoints";
import { GenreDTO } from "../../models/genres.models";
import GenericDataTable from "../utilities/GenericDataTable";

export default function TableGenres() {

    const [movieToGoGenresData, setMovieToGoGenresData] = useState<GenreDTO[]>([]);
    const [movieToGoError, setMovieToGoError] = useState('');

    const [theMovieDbGenresData, setTheMovieDbGenresData] = useState<GenreDTO[]>([]);
    const [theMovieDbError, setTheMovieDbError] = useState('');

    useEffect(() => {

        async function getMovieToGoGenres() {
            try {
                const response = await axios.get(movieToGoUrlGenres);
                setMovieToGoGenresData(response.data);
            } catch (error : any) {
                setMovieToGoError(error.message);
                console.log(error);
            }
        }

        async function getTheMovieDbGenres() {
            try {
                const response = await axios.get(theMovieDbGenres);
                setTheMovieDbGenresData(response.data.genres);
            } catch (error : any) {
                setTheMovieDbError(JSON.stringify(error.message));
                console.log(error);
            }
        }

        getMovieToGoGenres();
        getTheMovieDbGenres();

    }, [])

    return(
        <>
            <h1>Table Genres</h1>
            <Grid columns={2} divided>
                <GridRow>
                    <GridColumn>
                        {movieToGoGenresData.length > 0 ? <GenericDataTable tableName="MovieToGo API" color="blue" data={movieToGoGenresData} /> : undefined}
                        {movieToGoError ? <Message negative>MovieToGo API: {movieToGoError}</Message> : undefined}
                    </GridColumn>
                    <GridColumn>
                        {theMovieDbGenresData.length > 0 ? <GenericDataTable tableName="TheMovieDb API" color="purple" data={theMovieDbGenresData} /> : undefined}
                        {theMovieDbError ? <Message negative>TheMovieDb API: {theMovieDbError}</Message> : undefined}
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
};

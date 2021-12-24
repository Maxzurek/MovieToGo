import axios from "axios";
import { useEffect, useState } from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import { movieToGoUrlGenres, theMovieDbGenres } from "../../endpoints";
import { GenreDTO } from "../../models/genres.model";
import GenericDataTable from "../utilities/GenericDataTable";

export default function DatabaseTool() {

    const testData = [
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
        { "Id": 1, "Designation": "Drama" },
    ]

    const [movieToGoGenresData, setMovieToGoGenresData] = useState<GenreDTO[]>([]);
    const [movieToGoerror, setMovieToGoError] = useState([]);

    const [theMovieDbGenresData, setTheMovieDbGenresData] = useState<GenreDTO[]>([]);
    const [theMovieDbError, setTheMovieDbError] = useState([]);

    useEffect(() => {

        async function getMovieToGoGenres() {
            try {
                const response = await axios.get(movieToGoUrlGenres);
                setMovieToGoGenresData(response.data);
            } catch (error : any) {
                console.log(error);
                setMovieToGoError(error);
            }
        }

        async function getTheMovieDbGenres() {
            try {
                const response = await axios.get(theMovieDbGenres);

                setTheMovieDbGenresData(response.data.genres);
            } catch (error : any) {
                console.log(error);
                setTheMovieDbError(error);
            }
        }

        getMovieToGoGenres();
        getTheMovieDbGenres();

    }, [])

    return (
        <>
            <h1>Table Genres</h1>
            <Grid columns={2} divided>
                <GridRow>
                    <GridColumn>
                        {movieToGoGenresData.length > 0 ? <GenericDataTable tableName="MovieToGo API" color="green" data={movieToGoGenresData} /> : undefined}
                    </GridColumn>
                    <GridColumn>
                        {theMovieDbGenresData.length > 0 ? <GenericDataTable tableName="TheMovieDb API" color="orange" data={theMovieDbGenresData} /> : undefined}
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
};

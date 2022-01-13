import {Grid } from "semantic-ui-react";
import IndividualMovie from "./IndividualMovie";
import { movieCardDTO } from "../../models/movie.models";

export default function MovieCards(props:moviesCardsProps) {
    return (
        <>
            <Grid  columns={4} container doubling stackable>
                {props.movies.map((movieCrd,index) =>
                    <Grid.Column>
                        <IndividualMovie movie={movieCrd} key={index} />
                    </Grid.Column>
                )}
            </Grid>
        </>
    )
}

interface moviesCardsProps {
    movies: movieCardDTO[];

}


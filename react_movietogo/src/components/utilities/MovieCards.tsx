import {Grid } from "semantic-ui-react";
import IndividualMovie from "./IndividualMovie";
import { movieCardDTO, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";

export default function MovieCards(props:moviesCardsProps) {
    return (
        <>
            <Grid  columns={4} container doubling stackable>
                {props.theMovieDbDTO.map((movieCrd,index) =>
                    <Grid.Column>
                        <IndividualMovie theMovieDbDTO={movieCrd} key={index}
                                         movieToGoDTO ={props.movieToGoDTO[index]}/>
                    </Grid.Column>
                )}
            </Grid>
        </>
    )
}

interface moviesCardsProps {
    theMovieDbDTO: TheMovieDbDTO[];
    movieToGoDTO : MovieToGoDTO[];
}


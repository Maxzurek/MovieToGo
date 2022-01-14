import { Grid } from "semantic-ui-react";
import IndividualMovie from "./IndividualMovie";
import { movieCardDTO, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";

export default function MovieCards(props: moviesCardsProps) {
    console.log(props.theMovieDbDTO);
    console.log(props.movieToGoDTO);
    return (
        <>
            <Grid columns={4} container doubling stackable>
                {props.theMovieDbDTO.map((movieCrd, index) => {

                    console.log(props.movieToGoDTO[index]);

                    return (
                        <Grid.Column key={index}>
                            <IndividualMovie
                                key={index}
                                theMovieDbDTO={movieCrd}
                                movieToGoDTO={props.movieToGoDTO[index]}
                            />
                        </Grid.Column>
                    )
                }
                )}
            </Grid>
        </>
    )
}

interface moviesCardsProps {
    theMovieDbDTO: TheMovieDbDTO[];
    movieToGoDTO: MovieToGoDTO[];
}


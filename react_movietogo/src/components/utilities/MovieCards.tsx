import { Grid } from "semantic-ui-react";
import IndividualMovie from "./IndividualMovie";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";

export default function MovieCards(props: moviesCardsProps) {

    const renderGridColumn = () => {
        return (
            props.theMovieDbDTO.map((theMovieDbData, index) => 
                <Grid.Column key={index}>
                    <IndividualMovie
                        key={index}
                        theMovieDbDTO={theMovieDbData}
                        movieToGoDTO={props.movieToGoDTO[index]}
                    />
                </Grid.Column>
            )
        )
    }

    

    return (
        <>
            <Grid columns={4} container doubling stackable>
                {renderGridColumn()}
            </Grid>
        </>
    )
}

interface moviesCardsProps {
    theMovieDbDTO: TheMovieDbDTO[];
    movieToGoDTO: MovieToGoDTO[];
}


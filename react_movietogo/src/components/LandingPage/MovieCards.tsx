import IndividualMovie from "./IndividualMovie";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./ScrollMenuArrow";
import { Container } from "semantic-ui-react";

export default function MovieCards(props: moviesCardsProps) {

    return (
        <>
            <Container textAlign="center" style={{ marginBottom: 20 }}>
                <h1>{props.title}</h1>
            </Container>
            <ScrollMenu
                LeftArrow={<LeftArrow />}
                RightArrow={<RightArrow />}
            >
                {props.theMovieDbDTO.map((theMovieDbDTO, index) => (
                    <IndividualMovie
                        key={index}
                        theMovieDbDTO={theMovieDbDTO}
                        movieToGoDTO={props.movieToGoDTO[index]}
                        watchListDTO={props.watchListDTO}
                        itemId={index.toString()}
                    />
                ))}
            </ScrollMenu>
        </>
    )
}

interface moviesCardsProps {
    title: string;
    theMovieDbDTO: TheMovieDbDTO[];
    movieToGoDTO: MovieToGoDTO[];
    watchListDTO: WatchListDTO[] | undefined;
}
import IndividualMovie from "../utilities/IndividualMovie";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./ScrollMenuArrow";
import { Container, Dimmer, Header, Loader } from "semantic-ui-react";

export default function MovieCards(props: moviesCardsProps) {

    return (
        <Container style={{marginTop: 30, width: '79%'}}>
            <Container textAlign="center" style={{ marginBottom: 20 }}>
                <Header as="h1" color="blue">{props.title}</Header>
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
                        isInWatchList = {true}
                    />
                ))}
            </ScrollMenu>
        </Container>
    )
}

interface moviesCardsProps {
    title: string;
    theMovieDbDTO: TheMovieDbDTO[];
    movieToGoDTO: MovieToGoDTO[];
    watchListDTO: WatchListDTO[] | undefined;
    loading?: boolean;
}
import { Container, Header } from "semantic-ui-react";
import { WatchListDTO } from "../../models/watchlist.models";
import IndividualMovie from "../utilities/IndividualMovie";

interface WatchListItemContainerProps {
    watchListDTO: WatchListDTO
}

export default function WatchListItemContainer(props: WatchListItemContainerProps) {

    return (
        <Container fluid>
            {props.watchListDTO && props.watchListDTO.watchListItems && props.watchListDTO.watchListItems.length > 0 ?
                props.watchListDTO.watchListItems.map((watchListItemDTO, index) => {
                    return (
                        <IndividualMovie
                            theMovieDbDTO={watchListItemDTO.theMovieDbDTO!}
                            movieToGoDTO={watchListItemDTO.movie!}
                            itemId={index.toString()}
                            isInWatchList
                            watchListItemID={watchListItemDTO.id}
                            key={index}
                            watchListId={props.watchListDTO.id}
                        />
                    )
                })
                :  <Container fluid textAlign="center"><Header as='h1'>This watchlist is empty ...</Header></Container>
            }
        </Container>
    );
};        
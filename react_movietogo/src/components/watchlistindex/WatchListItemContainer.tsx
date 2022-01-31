import axios from "axios";
import { cloneElement, useContext, useEffect, useState } from "react";
import { Button, Card, Container, Header, Segment } from "semantic-ui-react";
import { movieToGoUrlWatchListItems, movieToGoUrlWatchLists, movieToGoUrlWatchListsUser } from "../../endpoints";
import { MovieToGoDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import { WatchListItemDTO } from "../../models/watchlist.models";
import AppDataContext from "../contexts/AppDataContext";
import IndividualMovie from "../utilities/IndividualMovie";
import WatchListIndex from "./WatchListIndex";


interface WatchListItemContainerProps {
    watchListDTO: WatchListDTO
}



export default function WatchListItemContainer(props: WatchListItemContainerProps) {





    return (
        <Container fluid>

            {props.watchListDTO && props.watchListDTO.watchListItems ? props.watchListDTO.watchListItems.map((watchListItemDTO, index) => {
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
            }) : undefined}


        </Container>


    );
};        

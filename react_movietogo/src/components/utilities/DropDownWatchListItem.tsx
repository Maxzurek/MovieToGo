import axios from "axios";
import { useEffect, useState } from "react";
import { DropdownItem, DropdownItemProps } from "semantic-ui-react"
import { movieToGoUrlWatchListItems } from "../../endpoints";
import { WatchListDTO, WatchListItemCreationDTO, WatchListItemDTO } from "../../models/watchlist.models";

interface DropDownWatchListItemProps {
    movieId: number;
    watchListDTO: WatchListDTO;
    icon?: string;
}

DropDownWatchListItem.defaultProps = {
    icon: 'list'
}

export default function DropDownWatchListItem(props: DropDownWatchListItemProps) {

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        props.watchListDTO.watchListItems?.map((watchListItem) => {
            watchListItem.movie?.id == props.movieId ? setDisabled(true) : setDisabled(false);
        })
    }, [])

    const createWatchListItem = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: DropdownItemProps) => {

        var watchListItemCreationDTO: WatchListItemCreationDTO = {
            watchListID: 0,
            movieId: 0
        }

        watchListItemCreationDTO.movieId = props.movieId;
        watchListItemCreationDTO.watchListID = props.watchListDTO.id;

        var watchListItemDTO: WatchListItemDTO = {
            id: 0,
            watched: false,
            movie: undefined,
        }

        await axios.post(movieToGoUrlWatchListItems, watchListItemCreationDTO)
            .then(response => {
                watchListItemDTO = response.data;
                props.watchListDTO.watchListItems?.push(watchListItemDTO);
                setDisabled(true);
            })
    }

    return (
        <DropdownItem
            disabled={disabled}
            icon={props.icon}
            text={props.watchListDTO.name}
            onClick={createWatchListItem}
        />
    )
};

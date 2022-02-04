import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownItem, Input, Label, MenuItem, Popup } from "semantic-ui-react";
import { movieToGoUrlWatchLists } from "../../endpoints";
import { WatchListDTO, WatchListUpdateDTO } from "../../models/watchlist.models";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";
import WatchlistContext from "./WatchlistContext";

interface WatchlistMenuItemProps {
    index: number;
    watchlistDTO: WatchListDTO;
    active: boolean;
    handleMenuItemClick(index: number, watchlistId: number): void;
    handleDeleteWatchList(index: number, watchlistId: number): void;
}

export default function WatchlistMenuItem(props: WatchlistMenuItemProps) {

    const { selectedWatchListDTO } = useContext(WatchlistContext);
    const notifyWatchlistChanged = useContext(NotifyDataChangedContext);

    const [editable, setEditable] = useState<boolean | undefined>();
    const [editInputValue, setEditInputValue] = useState(props.watchlistDTO.name);
    const [editInputError, setEditInputError] = useState(false);

    const input = useRef<Input>(null);

    useEffect(() => {
        if (editable) {
            input.current?.select();
        }
    }, [editable])

    const updateWatchlist = async () => {

        if (editInputValue?.length === 0) {
            setEditInputError(true);
            return;
        }
        else if (editInputValue === props.watchlistDTO.name) {
            setEditable(false);
            return;
        }

        setEditInputError(false);

        let watchlistUpdateDTO: WatchListUpdateDTO = {
            name: editInputValue
        }

        await axios.put(`${movieToGoUrlWatchLists}/${props.watchlistDTO.id}`, watchlistUpdateDTO)
            .then((response: AxiosResponse<WatchListDTO>) => {

                let updatedWatchlistDTO = response.data;

                props.watchlistDTO.name = updatedWatchlistDTO.name;

                if (selectedWatchListDTO?.id === props.watchlistDTO.id) {
                    notifyWatchlistChanged();
                }

                setEditable(false);
            })
    }

    return (
        <>
            {editable ?
                <>
                    <Input
                        style={editInputError ? { border: '1px solid red' } : {}}
                        value={editInputValue}
                        onChange={(e, data) => setEditInputValue(data.value)}
                        onKeyDown={(event: any) => {
                            if (event.key === 'Enter') {
                                updateWatchlist()
                            }
                        }}
                        onBlur={() => updateWatchlist()}
                        ref={input}
                    />
                    <Label style={{ color: 'black', backgroundColor: "transparent" }}>
                        <Popup
                            content="More actions"
                            trigger={
                                <Dropdown icon="ellipsis horizontal" style={{ fontSize: 16 }} direction="left">
                                    <Dropdown.Menu >
                                        <DropdownItem text="Cancel" onClick={() => setEditable(false)} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            }>
                        </Popup>
                    </Label>
                </>
                :
                <MenuItem
                    index={props.index}
                    active={props.active}
                    onClick={() => { props.handleMenuItemClick(props.index, props.watchlistDTO.id) }}
                    style={{ padding: "13px 10px", fontSize: 14 }}
                >
                    {props.watchlistDTO.name}
                    <Label style={{ color: 'black', backgroundColor: "transparent" }}>
                        <Popup
                            content="More actions"
                            trigger={
                                <Dropdown
                                    icon="ellipsis horizontal"
                                    style={{ fontSize: 16 }}
                                    direction="left"
                                >
                                    <Dropdown.Menu style={{ color: "red" }}>
                                        <DropdownItem
                                            style={{ color: "red" }}
                                            text="Rename"
                                            onClick={() => setEditable(true)}
                                        />
                                        <DropdownItem
                                            style={{ color: "red" }}
                                            text="Delete"
                                            onClick={() => props.handleDeleteWatchList(props.index, props.watchlistDTO.id)}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                            }>
                        </Popup>
                    </Label>
                </MenuItem>
            }

        </>
    )
};
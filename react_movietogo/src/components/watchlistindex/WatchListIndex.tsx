
import { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, DropdownItem, Form, Grid, GridColumn, GridRow, Header, Icon, Label, Loader, Menu, MenuItem, Segment } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO, WatchListItemDTO } from "../../models/watchlist.models";
import WatchListItemContainer from "./WatchListItemContainer";
import WatchListCreate from "../watchlistindex/WatchListCreate";
import AppDataContext from "../contexts/AppDataContext";
import axios, { AxiosResponse } from "axios";
import { movieToGoUrlWatchLists, theMovieDbApiKey, theMovieDbMovie } from "../../endpoints";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";
import WatchListUpdate from "./WatchListUpdate";
import ModalContext from "../contexts/ModalContext";

interface WatchListIndexProps {
    theMovieDbDTO?: TheMovieDbDTO[];
    movieToGoDTO?: MovieToGoDTO[];
    watchListDTO?: WatchListDTO[] | undefined;

}

export default function WatchListIndex(props: WatchListIndexProps) {


    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext)
    const { displayOkMessage } = useContext(ModalContext)
    
    const [activeItem, setActiveItem] = useState(0);
    const [selectedWatchListDTO, setSelectedWatchListDTO] = useState<WatchListDTO | undefined>()
    const [isLoading, setIsLoading] = useState(false)

    const menuItemsStyle = { padding: "13px 10px" }

    const handleItemClick = (e: any, data: any) => {

        setActiveItem(data.index);

        if (userWatchListDTO) {
            setSelectedWatchListDTO(userWatchListDTO[data.index])
        }
    }

    const updateWatchList = () => {
        setActiveItem(-2)
    }

    const deleteWatchList = async () => {


        await axios.delete(movieToGoUrlWatchLists + `?id=${selectedWatchListDTO?.id}`)
            .then(response => {

                let watchList = userWatchListDTO?.findIndex(x => x.id === selectedWatchListDTO?.id)
                console.log("delete")
                console.log(watchList)
                
 
                if(watchList || watchList! >= 0){

                    let watchListSplice  = userWatchListDTO?.splice(watchList!, 1)
                    console.log(watchListSplice)
                    
                }

                
                
                setUserWatchListDTO(userWatchListDTO)
                displayOkMessage("WatchList Deleted!")
                

            })
            .catch(error => console.log(error))


    }

    const renderMenuItems = () => {
        return (
            userWatchListDTO?.map((watchlist, index) => {
                return (
                    <MenuItem
                        key={index}
                        index={index}
                        active={activeItem === index}
                        onClick={handleItemClick}
                        style={menuItemsStyle}>
                        {watchlist.name}
                        <Label style={{backgroundColor : "transparent"}}>
                            <Dropdown icon="ellipsis horizontal" >
                                
                                <Dropdown.Menu >
                                    <DropdownItem text="Delete" onClick={deleteWatchList}/>
                                    <DropdownItem text="Rename" onClick={updateWatchList} />
                                </Dropdown.Menu>
                            </Dropdown></Label>
                    </MenuItem>


                )

            })
        )
    }
    const setSelectedWatchList = (index: number) => {
        setActiveItem(index)
        setSelectedWatchListDTO(userWatchListDTO![index])

    }

    const fetchTheMovieDbData = async () => {

        await Promise.all(userWatchListDTO!.map(async (watchList, watchListIndex) => {

            await Promise.all(watchList.watchListItems!.map(async (watchListItem, watchListItemIndex) => {

                await axios.get(`${theMovieDbMovie}/${watchListItem.movie?.theMovieDbId}?api_key=${theMovieDbApiKey}&language=en-US`)
                    .then((response: AxiosResponse<TheMovieDbDTO>) => {

                        let watchList = userWatchListDTO![watchListIndex]
                        let watchListItem = watchList?.watchListItems?.[watchListItemIndex]

                        if (watchListItem) {
                            watchListItem.theMovieDbDTO = response.data
                        }
                    })
                    .catch(error => {
                        setIsLoading(false)
                    });
            }))
        }))
    }

    const fetchData = async () => {

        setIsLoading(true)

        await fetchTheMovieDbData()
            .then(promise => {
                setIsLoading(false)

                if (userWatchListDTO && userWatchListDTO.length > 0) {
                    setSelectedWatchListDTO(userWatchListDTO[activeItem])
                }
            })
    }

    useEffect(() => {

        if (userWatchListDTO && userWatchListDTO.length > 0) {
            renderMenuItems();
            fetchData();
        }

    }, [userWatchListDTO])


    return (
        <NotifyDataChangedContext.Provider value={() => {
            fetchData();
        }}>

            <Grid padded >
                <GridRow >
                    <GridColumn width={3}>
                        <Menu fluid vertical tabular>
                            {userWatchListDTO && userWatchListDTO.length > 0 ? renderMenuItems() : undefined}
                            <Button fluid
                                color="green"
                                icon
                                index={-1}
                                name='watchListCreation'
                                active={activeItem === -1}
                                onClick={() => setActiveItem(-1)}
                            >
                                <Icon name='plus' /> New Watchlist
                            </Button>
                        </Menu>

                    </GridColumn>
                    <GridColumn width={13}>
                        <Segment loading={isLoading}>
                            {activeItem >= 0 && !isLoading && userWatchListDTO ?
                                <WatchListItemContainer watchListDTO={selectedWatchListDTO!} />
                                :
                                undefined}
                            {!userWatchListDTO && activeItem >= 0 ?
                                <Container fluid textAlign="center"><Header>You have no watchlist</Header></Container>
                                :
                                undefined}
                            {activeItem == -1 ?
                                <WatchListCreate setActiveItem={setActiveItem} setSelectedWatchListDTO={setSelectedWatchListDTO} />
                                :
                                undefined}
                            {activeItem == -2 ?
                                <WatchListUpdate setActiveItem={setActiveItem} />
                                :
                                undefined}
                        </Segment>
                    </GridColumn>
                </GridRow>
            </Grid>
        </NotifyDataChangedContext.Provider>
    )
}; 

import { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Grid, GridColumn, GridRow, Header, Icon, Loader, Menu, MenuItem, Segment } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO, WatchListItemDTO } from "../../models/watchlist.models";
import WatchListItemContainer from "./WatchListItemContainer";
import WatchListCreate from "../watchlistindex/WatchListCreate";
import AppDataContext from "../contexts/AppDataContext";
import axios, { AxiosResponse } from "axios";
import { theMovieDbApiKey, theMovieDbMovie } from "../../endpoints";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";
import WatchListUpdate from "./WatchListUpdate";

interface WatchListIndexProps {
    theMovieDbDTO?: TheMovieDbDTO[];
    movieToGoDTO?: MovieToGoDTO[];
    watchListDTO?: WatchListDTO[] | undefined;

}

export default function WatchListIndex(props: WatchListIndexProps) {


    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext)
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

    const renderMenuItems = () => {
        return (
            userWatchListDTO?.map((watchlist, index) => {
                return (
                  <> <MenuItem
                        key={index}
                        index={index}
                        active={activeItem === index}
                        onClick={handleItemClick}
                        style={menuItemsStyle}>
                        {watchlist.name}
                    </MenuItem>
                    <Button fluid
                                color="blue"
                                icon
                                index={-1}
                                name='watchListCreation'
                                active={activeItem === -1}
                                onClick={() => setActiveItem(-2)}
                            >
                                <Icon name='sync' /> Update WatchList
                            </Button>
                   </>  
                )

            })
        )
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
                            {!userWatchListDTO && activeItem >= 0? 
                                <Container fluid textAlign="center"><Header>You have no watchlist</Header></Container>
                                :
                                undefined}
                            {activeItem == -1 ?
                                <WatchListCreate setActiveItem={setActiveItem} />
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
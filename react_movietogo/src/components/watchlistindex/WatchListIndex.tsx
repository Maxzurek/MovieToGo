
import { useContext, useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Loader, Menu, MenuItem, Segment } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import WatchListItemContainer from "./WatchListItemContainer";
import WatchListCreate from "../watchlistindex/WatchListCreate";
import AppDataContext from "../contexts/AppDataContext";
import axios, { AxiosResponse } from "axios";
import { theMovieDbApiKey, theMovieDbMovie } from "../../endpoints";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";

interface WatchListIndexProps {
    theMovieDbDTO?: TheMovieDbDTO[];
    movieToGoDTO?: MovieToGoDTO[];
    watchListDTO?: WatchListDTO[] | undefined;

}

export default function WatchListIndex(props: WatchListIndexProps) {


    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext)
    const [activeItem, setActiveItem] = useState(0);
    const [selectedWatchListDTO, setSelectedWatchListDTO] = useState<WatchListDTO | undefined >(userWatchListDTO![0])
    const [watchListWasCreated, setWatchListWasCreated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [firstTimeLoading, setFirstTimeLoading] = useState(true)

    const menuItemsStyle = { padding: "13px 10px" }

    const handleItemClick = (e: any, data: any) => {
        if (data.name === 'watchListCreation') {
            setActiveItem(-1);

        } else {
            setActiveItem(data.index);
            if (userWatchListDTO) {
                setSelectedWatchListDTO(userWatchListDTO[data.index])
            }
        }
    }

    const renderSegment = () => {

        if (activeItem >= 0) {
            return (
                <WatchListItemContainer watchListDTO={selectedWatchListDTO!} />
            )
        } else {

            return (
                <WatchListCreate setActiveItem={setActiveItem} />
            )
        }
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
                    </MenuItem>
                )

            })
        )
    }

    const test = async () => {
        userWatchListDTO?.map((watchList, watchListIndex) => {
            watchList.watchListItems!.map(async (watchListItem, watchListItemIndex) => {
                let requests = []

            })
        })
    }

    const fetchTheMovieDbData = async () => {
        setIsLoading(true)
        userWatchListDTO?.map((watchList, watchListIndex) => {
            watchList.watchListItems?.map(async (watchListItem, watchListItemIndex) => {
                await axios.get(`${theMovieDbMovie}/${watchListItem.movie?.theMovieDbId}?api_key=${theMovieDbApiKey}&language=en-US`)
                    .then((response: AxiosResponse<TheMovieDbDTO>) => {
                        console.log(response.data)
                        let watchList = userWatchListDTO[watchListIndex]
                        let watchListItem = watchList?.watchListItems?.[watchListItemIndex]

                        if (watchListItem) {
                            watchListItem.theMovieDbDTO = response.data
                            setIsLoading(false)
                            
                        }

                    })
                    .catch(error => {
                        setIsLoading(false)
                    });

            })
        })
    }

    useEffect( () => {
        console.log(userWatchListDTO![0])
        if (userWatchListDTO && userWatchListDTO.length > 0) {
            renderMenuItems();
            fetchTheMovieDbData();
        }
        
    }, [userWatchListDTO])


    return (
        <NotifyDataChangedContext.Provider value={() => {
            fetchTheMovieDbData();
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
                                onClick={handleItemClick}
                            >
                                <Icon name='plus' /> Create a WatchList
                            </Button>
                        </Menu>

                    </GridColumn>
                    <GridColumn width={13}>
                        <Segment loading={isLoading}>

                            {!isLoading && userWatchListDTO && userWatchListDTO.length > 0 || activeItem === -1 ? renderSegment() : <Container textAlign="center"><Header>You have no Watchlist</Header></Container>}
                        </Segment>
                    </GridColumn>
                </GridRow>
            </Grid>
        </NotifyDataChangedContext.Provider>
    )
}; 
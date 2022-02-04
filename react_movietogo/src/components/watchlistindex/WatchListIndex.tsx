import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Dimmer, Divider, Grid, GridColumn, GridRow, Header, Icon, Loader, Menu, MenuItem, Modal, ModalActions, ModalContent, Ref, Segment, Sidebar } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListCreationDTO, WatchListDTO } from "../../models/watchlist.models";
import WatchListItemContainer from "./WatchListItemContainer";
import AppDataContext from "../contexts/AppDataContext";
import axios, { AxiosResponse } from "axios";
import { movieToGoUrlMovieVotesByMovieId, movieToGoUrlWatchLists, theMovieDbApiKey, theMovieDbMovie } from "../../endpoints";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";
import WatchlistMenuItem from "./WatchlistMenuItem";
import Media from "../mediaContexr/Media";
import WatchlistContext from "./WatchlistContext";

interface WatchListIndexProps {
    theMovieDbDTO?: TheMovieDbDTO[];
    movieToGoDTO?: MovieToGoDTO[];
    watchListDTO?: WatchListDTO[] | undefined;
}

export default function WatchListIndex(props: WatchListIndexProps) {

    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext);

    const [activeItem, setActiveItem] = useState(0);
    const [selectedWatchListDTO, setSelectedWatchListDTO] = useState<WatchListDTO | undefined>();
    const [loadingData, setLoadingData] = useState(false);
    const [visibleSidebar, setVisibleSidebar] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [watchlistIdToRemove, setWatchlistIdToRemove] = useState(-1);

    const segmentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        window.addEventListener('scroll', () => setVisibleSidebar(false));

        return () => window.removeEventListener('scroll', () => { });
    }, [])

    useEffect(() => {

        if (userWatchListDTO && userWatchListDTO.length > 0) {
            fetchData();
        }

    }, [])

    useEffect(() => {

        if (userWatchListDTO && userWatchListDTO.length > 0) {
            setSelectedWatchListDTO(userWatchListDTO[activeItem])
        }
        else {
            setSelectedWatchListDTO(undefined)
        }
    }, [activeItem, userWatchListDTO])

    const fetchData = async () => {

        setLoadingData(true)

        await fetchTheMovieDbData()
            .then(async (promise) => {

                await fetchMovieVote()
                    .then(promise => {
                        setLoadingData(false)
                    })
            })
    }

    const fetchTheMovieDbData = async () => {

        await Promise.all(userWatchListDTO!.map(async (watchList, watchListIndex) => {

            await Promise.all(watchList.watchListItems!.map(async (watchListItem, watchListItemIndex) => {

                await axios.get(`${theMovieDbMovie}/${watchListItem.movie?.theMovieDbId}?api_key=${theMovieDbApiKey}&language=en-US`)
                    .then(async (response: AxiosResponse<TheMovieDbDTO>) => {

                        let watchList = userWatchListDTO![watchListIndex]
                        let watchListItem = watchList?.watchListItems?.[watchListItemIndex]

                        if (watchListItem) {
                            watchListItem.theMovieDbDTO = response.data
                        }
                    })
                    .catch(error => {
                        setLoadingData(false)
                    });
            }))
        }))
    }

    const fetchMovieVote = async () => {

        await Promise.all(userWatchListDTO!.map(async (watchList, watchListIndex) => {

            await Promise.all(watchList.watchListItems!.map(async (watchListItem, watchListItemIndex) => {

                await axios.get(movieToGoUrlMovieVotesByMovieId + `/${watchListItem.movie?.id}`)
                    .then((response) => {

                        let movieVoteDTO = response.data;

                        // Our API returns an empty string if we don't have a vote for the movie we are mapping
                        // We then want to set it to undefined so we can properly post a vote in the MovieRating component
                        // instead of a put.
                        if (response.status === 204) {
                            movieVoteDTO = undefined;
                        }

                        watchListItem.movie!.movieVote = movieVoteDTO;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }))
        }))
    }

    const handleMenuItemClick = async (index: number, selectedWatchlistID: number) => {

        setActiveItem(index);
        setSelectedWatchListDTO(userWatchListDTO?.find(x => x.id === selectedWatchlistID));
        setVisibleSidebar(false);
    }

    const handleDeleteWatchList = (index: number, watchlistId: number) => {

        setActiveItem(index)
        setWatchlistIdToRemove(watchlistId);
        setOpenModal(true);
    }

    async function createWatchList() {

        let defaultNewWatchlistName = "New Watchlist";

        const watchListCreationDTO: WatchListCreationDTO = { name: defaultNewWatchlistName }

        await axios.post(movieToGoUrlWatchLists, watchListCreationDTO)
            .then((response: AxiosResponse<WatchListDTO>) => {

                let watchListDTOs: WatchListDTO[] = []

                if (userWatchListDTO) {
                    watchListDTOs = userWatchListDTO.slice()
                }

                watchListDTOs.push(response.data)
                setUserWatchListDTO(watchListDTOs)

                setActiveItem(watchListDTOs?.length - 1)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteWatchList = async () => {

        await axios.delete(movieToGoUrlWatchLists + `?id=${watchlistIdToRemove}`)
            .then(response => {

                let deletedWatchlistIndex = userWatchListDTO?.findIndex(x => x.id === watchlistIdToRemove)
                let newWatchlistDTO = userWatchListDTO;

                if (deletedWatchlistIndex || deletedWatchlistIndex! >= 0) {

                    newWatchlistDTO?.splice(deletedWatchlistIndex!, 1)
                }

                setUserWatchListDTO(newWatchlistDTO);

                if (newWatchlistDTO && newWatchlistDTO.length > 0) {
                    setActiveItem(0);
                }
                else {
                    setSelectedWatchListDTO(undefined);
                }
            })
            .catch(error => console.log(error))

    }

    const renderMenuItems = () => {
        return (
            userWatchListDTO?.map((watchlistDTO, index) => {
                return (
                    <WatchlistMenuItem
                        index={index}
                        key={index}
                        watchlistDTO={watchlistDTO}
                        active={activeItem === index}
                        {...(watchlistDTO?.name === "New Watchlist" ? { newEntry: true } : {})}
                        handleMenuItemClick={handleMenuItemClick}
                        handleDeleteWatchList={handleDeleteWatchList}
                    />
                )
            })
        )
    }

    const renderDesktopMenu = () => {
        return (
            <>
                <Grid padded >
                    <GridRow >
                        <GridColumn width={3}>
                            <Menu fluid vertical tabular>
                                <MenuItem>
                                    <Header as={"h3"}>Your watchlists</Header>
                                    <Divider></Divider>
                                </MenuItem>
                                {userWatchListDTO && userWatchListDTO.length > 0 ? renderMenuItems() : undefined}
                                <Divider section />
                                <MenuItem
                                    style={{ color: "green" }}
                                    icon='plus'
                                    content="New Watchlist"
                                    name='watchListCreation'
                                    active={activeItem === -1}
                                    onClick={() => createWatchList()}
                                />
                            </Menu>
                        </GridColumn>
                        <GridColumn width={13}>
                            <Container fluid >
                                <Dimmer>
                                    <Loader active={loadingData} />
                                </Dimmer>
                                {userWatchListDTO && userWatchListDTO.length > 0 ?
                                    undefined
                                    :
                                    <Container fluid textAlign="center"><Header>You have no watchlist</Header></Container>
                                }
                                {activeItem >= 0 && selectedWatchListDTO && !loadingData ?
                                    <WatchListItemContainer watchListDTO={selectedWatchListDTO!} />
                                    :
                                    undefined
                                }
                            </Container>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </>
        )
    }

    const renderTabletAndMobileMenu = () => {
        return (
            <>
                <Sidebar.Pushable as={Segment.Group} raised style={{ height: 850 }}>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        onHide={() => setVisibleSidebar(false)}
                        vertical
                        target={segmentRef}
                        visible={visibleSidebar}
                        width="thin"
                    >
                        <Menu fluid vertical tabular>
                            <MenuItem>
                                <Header as={"h3"}>Your watchlists</Header>
                                <Divider></Divider>
                            </MenuItem>
                            {userWatchListDTO && userWatchListDTO.length > 0 ? renderMenuItems() : undefined}
                            <Divider section />
                            <MenuItem
                                style={{ color: "green" }}
                                icon='plus'
                                content="New Watchlist"
                                name='watchListCreation'
                                onClick={() => createWatchList()}
                            />
                        </Menu>
                    </Sidebar>
                    <Grid padded >
                        <GridRow >
                            <GridColumn width={2}>
                                <Button
                                    icon
                                    style={{ backgroundColor: "transparent" }}
                                    onClick={() => { setVisibleSidebar(!visibleSidebar) }}
                                >
                                    <Icon name="list" size="big" />
                                </Button>
                            </GridColumn>
                            <GridColumn width={14}>
                                <Ref innerRef={segmentRef}>
                                    <Container fluid >
                                        <Dimmer>
                                            <Loader active={loadingData} />
                                        </Dimmer>
                                        {userWatchListDTO && userWatchListDTO.length > 0 ?
                                            undefined
                                            :
                                            <Container fluid textAlign="center"><Header>You have no watchlist</Header></Container>
                                        }
                                        {activeItem >= 0 && selectedWatchListDTO ?
                                            <WatchListItemContainer watchListDTO={selectedWatchListDTO!} />
                                            :
                                            undefined
                                        }
                                    </Container>
                                </Ref>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </Sidebar.Pushable>
            </>
        )
    }

    return (
        <NotifyDataChangedContext.Provider value={() => {
            fetchData();
        }}>
            <WatchlistContext.Provider value={{
                selectedWatchListDTO: selectedWatchListDTO,
                setSelectedWatchListDTO: setSelectedWatchListDTO
            }}>

                <Media mobile tablet>
                    {renderTabletAndMobileMenu()}
                </Media>
                <Media desktop>
                    {renderDesktopMenu()}
                </Media>

                <Modal
                    basic
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}
                    dimmer='blurring'
                    open={openModal}
                    size='small'
                >
                    <Header icon>
                        <Icon name='trash' />
                        Removing a watchlist
                    </Header>
                    <ModalContent>
                        <Header>
                            Are you sure you want to delete: {userWatchListDTO ? userWatchListDTO.find(x => x.id === watchlistIdToRemove)?.name : undefined}
                        </Header>
                    </ModalContent>
                    <ModalActions>
                        <Button inverted onClick={() => {
                            setOpenModal(false)
                        }}>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button basic color='red' inverted onClick={() => {
                            setOpenModal(false)
                            deleteWatchList();
                        }}
                        >
                            <Icon name='checkmark' /> Delete
                        </Button>
                    </ModalActions>
                </Modal>

            </WatchlistContext.Provider>
        </NotifyDataChangedContext.Provider>
    )
}; 
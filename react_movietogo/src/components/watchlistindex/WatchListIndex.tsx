import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Menu, MenuItem, Modal, ModalActions, ModalContent, Ref, Segment, Sidebar } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import WatchListItemContainer from "./WatchListItemContainer";
import WatchListCreate from "../watchlistindex/WatchListCreate";
import AppDataContext from "../contexts/AppDataContext";
import axios, { AxiosResponse } from "axios";
import { movieToGoUrlWatchLists, theMovieDbApiKey, theMovieDbMovie } from "../../endpoints";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";
import ModalContext from "../contexts/ModalContext";
import WatchlistMenuItem from "./WatchlistMenuItem";
import Media from "../mediaContexr/Media";

interface WatchListIndexProps {
    theMovieDbDTO?: TheMovieDbDTO[];
    movieToGoDTO?: MovieToGoDTO[];
    watchListDTO?: WatchListDTO[] | undefined;
}

export default function WatchListIndex(props: WatchListIndexProps) {

    const { displayOkMessage } = useContext(ModalContext);
    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext);

    const [activeItem, setActiveItem] = useState(0);
    const [selectedWatchListDTO, setSelectedWatchListDTO] = useState<WatchListDTO | undefined>();
    const [isLoading, setIsLoading] = useState(false);
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

    }, [userWatchListDTO])

    useEffect(() => {

        if (userWatchListDTO && userWatchListDTO.length > 0) {
            setSelectedWatchListDTO(userWatchListDTO[activeItem])
        }
        else {
            setSelectedWatchListDTO(undefined)
        }
    }, [activeItem, userWatchListDTO])

    const fetchData = async () => {

        setIsLoading(true)

        await fetchTheMovieDbData()
            .then(promise => {
                setIsLoading(false)
            })
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

    const handleMenuItemClick = (index: number) => {

        setActiveItem(index);
        setVisibleSidebar(false);
    }

    const handleDeleteWatchList = (watchlistId: number) => {

        setWatchlistIdToRemove(watchlistId);
        setOpenModal(true);
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
                                    color="green"
                                    icon='plus'
                                    content="New watchlist"
                                    name='watchListCreation'
                                    active={activeItem === -1}
                                    onClick={() => setActiveItem(-1)}
                                />
                            </Menu>
                        </GridColumn>
                        <GridColumn width={13}>
                            <Segment loading={isLoading}>
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
                                {activeItem === -1 ?
                                    <WatchListCreate setActiveItem={setActiveItem} />
                                    :
                                    undefined
                                }
                            </Segment>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </>
        )
    }

    const renderTabletAndMobileMenu = () => {
        return (
            <>
                <Sidebar.Pushable as={Segment.Group} raised>
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
                                icon='plus'
                                content="New watchlist"
                                name='watchListCreation'
                                active={activeItem === -1}
                                onClick={() => {
                                    setActiveItem(-1);
                                    setVisibleSidebar(false);
                                }}
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
                                    <Segment loading={isLoading}>
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
                                        {activeItem === -1 ?
                                            <WatchListCreate setActiveItem={setActiveItem} />
                                            :
                                            undefined
                                        }
                                    </Segment>
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
                    <Icon name='archive' />
                    Removing a watchlist
                </Header>
                <ModalContent>
                    <p>
                        Are you sure you want to delete {userWatchListDTO?.find(x => x.id === watchlistIdToRemove)?.name}
                    </p>
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

        </NotifyDataChangedContext.Provider>
    )
}; 
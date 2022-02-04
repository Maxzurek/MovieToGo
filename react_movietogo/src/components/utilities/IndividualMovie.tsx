import { Button, Container, Label, Image, Card, Dropdown, Popup, Segment, Header, DropdownItem, Item, Icon } from "semantic-ui-react";
import { movieToGoUrlWatchListItems, movieToGoUrlWatchLists, theMovieDbImages } from "../../endpoints";
import Authorized from "../authentication/Authorized";
import { useNavigate } from "react-router-dom";
import { WatchListDTO, WatchListItemDTO, WatchListItemUpdateDTO } from "../../models/watchlist.models";
import DropDownWatchListItem from "../LandingPage/DropDownWatchListItem";
import MovieRating from "./MovieRating";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import NotifyDataChangedContext from "../contexts/NotifyDataChangedContext";
import AppDataContext from "../contexts/AppDataContext";


export default function IndividualMovie(props: IndividualMovieProps) {

    const navigate = useNavigate();
    const notifyDataChanged = useContext(NotifyDataChangedContext);
    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext);

    const handleOnClick = () => {
        navigate('/movie', { state: { theMovieDbId: props.theMovieDbDTO?.id, movieToGoId: props.movieToGoDTO?.id } })
    }

    const renderDropDownItems = () => {
        if (props.watchListDTOs) {
            return (
                props.watchListDTOs?.map((watchList, index) => {
                    return (
                        <DropDownWatchListItem key={index} movieId={props.movieToGoDTO?.id} watchListDTO={watchList} />
                    );
                })
            )
        }
        else {
            return undefined;
        }
    }

    const renderDropDownActions = () => {
        return (
            <>
                {props.watchListItemDTO?.watched ?
                    undefined
                    :
                    <DropdownItem
                        icon={"eye"}
                        text={'Mark as watched'}
                        onClick={markMovieAsWatched}
                    />
                }
                <DropdownItem
                    style={{ color: "red" }}
                    icon={"delete"}
                    text={'Remove from watchlist'}
                    onClick={deleteMovieFromWatchList}
                />
            </>
        )
    }

    const markMovieAsWatched = async () => {

        let watchLisItemtUpdateDTO: WatchListItemUpdateDTO = {
            watched: true
        }

        await axios.put(`${movieToGoUrlWatchListItems}/${props.watchListItemDTO?.id}`, watchLisItemtUpdateDTO)
            .then((response: AxiosResponse<WatchListItemDTO>) => {

                let updatedWatchlistItem = response.data;

                if (props.watchListId) {
                    let updatedWatchLists = userWatchListDTO;
                    let watchList = updatedWatchLists?.find(x => x.id === props.watchListId);
                    let watchlistItemIndex = watchList?.watchListItems?.findIndex(x => x.id === props.watchListItemDTO?.id);

                    watchList!.watchListItems![watchlistItemIndex!] = updatedWatchlistItem

                    setUserWatchListDTO(updatedWatchLists);
                    notifyDataChanged();
                }
            })
    }

    const deleteMovieFromWatchList = async () => {
        await axios.delete(movieToGoUrlWatchListItems + `?Id=${props.watchListItemDTO?.id}`)
            .then((response) => {
                if (props.watchListId) {
                    let watchLists = userWatchListDTO;
                    let watchList = watchLists?.find(x => x.id === props.watchListId);
                    let watchlistItemIndex = watchList?.watchListItems?.findIndex(x => x.id === props.watchListItemDTO?.id);

                    if (watchlistItemIndex) {
                        watchList?.watchListItems?.splice(watchlistItemIndex!, 1);
                    }
                    else if (watchlistItemIndex! >= 0) {
                        watchList?.watchListItems?.splice(watchlistItemIndex!, 1);
                    }

                    setUserWatchListDTO(watchLists);
                    notifyDataChanged();
                }
            })
            .catch(error => console.log(error))
    }

    const getPopupContent = () => {

        if (props.isInWatchList) {
            return "More actions"
        } else {
            return props.watchListDTOs ? "Add Movie to Watchlist" : "No Watchlist"
        }
    }

    return (
        <Card style={{ margin: 10, width: 250 }} >
            <Segment color="yellow" inverted style={{ margin: 0, cursor: "pointer" }} onClick={handleOnClick}>
                {props.movieToGoDTO?.voteAverage ?
                    <Header as='h3'>Overall Rating: {props.movieToGoDTO.voteAverage}/10</Header>
                    : <Header as='h3'>No Rating Yet</Header>}
            </Segment>

            <Image src={theMovieDbImages + props.theMovieDbDTO?.poster_path} style={{ cursor: "pointer" }} onClick={handleOnClick} />

            <Card.Content>
                <Container as={'a'} onClick={handleOnClick} >
                    <Header as='h3' color="blue">{props.theMovieDbDTO?.title}</Header>
                    <Card.Meta>{props.theMovieDbDTO?.release_date}</Card.Meta>
                </Container>
                <Authorized
                    authorized={
                        <>
                            <MovieRating movieToGoDTO={props.movieToGoDTO} />
                            {props.watchListItemDTO?.watched ?
                                <Popup
                                    content='You have watched this movie'
                                    trigger={
                                        <Icon name="eye" color="green" style={{ float: 'right', marginRight: 40 }}>Watched</Icon>
                                    }
                                />
                                :
                                undefined
                            }
                        </>
                    }
                    notAuthorized={<></>}
                />

                <Authorized
                    authorized={
                        <Label attached="top right" color="yellow">
                            <Dropdown
                                item
                                trigger={<><Popup on='hover' content={getPopupContent()}
                                    trigger={<Button circular icon={props.isInWatchList ? 'ellipsis horizontal' : 'add'} basic size="mini" color="vk" />} /></>}
                                icon={null}>
                                <Dropdown.Menu direction="left">
                                    {props.isInWatchList ?
                                        renderDropDownActions()
                                        : renderDropDownItems()}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Label>
                    }
                    notAuthorized={<></>}
                />
            </Card.Content>
        </Card>
    )
}

export interface IndividualMovieProps {
    theMovieDbDTO: TheMovieDbDTO | undefined;
    movieToGoDTO: MovieToGoDTO | undefined;
    itemId: string | undefined;
    isInWatchList?: boolean | undefined;
    watchListItemDTO?: WatchListItemDTO | undefined;
    watchListId?: number | undefined;
    watchListDTOs?: WatchListDTO[] | undefined;
}
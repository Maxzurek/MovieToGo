import { Button, Container, Label, Image, Card, Dropdown, Popup, Segment, Header } from "semantic-ui-react";
import { theMovieDbImages } from "../../endpoints";
import Authorized from "../authentication/Authorized";
import { useNavigate } from "react-router-dom";
import { WatchListDTO } from "../../models/watchlist.models";
import DropDownWatchListItem from "../LandingPage/DropDownWatchListItem";
import MovieRating from "./MovieRating";
import { useContext } from "react";
import AppDataContext from "../contexts/AppDataContext";
import { MovieToGoDTO, NavigationMovieDTO, TheMovieDbDTO } from "../../models/movie.models";


export default function IndividualMovie(props: IndividualMovieProps) {

    const { setNavigationDTO } = useContext(AppDataContext);
    const navigate = useNavigate();

    const handleOnClick = () => {

        const navigationMovieDTO: NavigationMovieDTO = {
            movieToGoDTO: props.movieToGoDTO,
            theMovieDbDTO: props.theMovieDbDTO,
        }

        setNavigationDTO(navigationMovieDTO)

        navigate('/movie')
    }

    const renderDropDownItems = () => {
        if (props.watchListDTO) {
            return (
                props.watchListDTO?.map((watchList, index) => {
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

    return (
        <Card style={{ margin: 10, width: 250 }} >
            <Segment color="yellow" inverted style={{ margin: 0, cursor: "pointer" }} onClick={handleOnClick}>
                {props.movieToGoDTO?.voteAverage ?
                    <Header as='h3'>Overall Rating: {props.movieToGoDTO.voteAverage}/10</Header>
                    : <Header as='h3'>No Rating Yet</Header>}
            </Segment>
            <Image src={theMovieDbImages + props.theMovieDbDTO.poster_path} style={{ cursor: "pointer" }} onClick={handleOnClick} />
            <Card.Content>
                <Container as={'a'} onClick={handleOnClick} >
                    <Card.Header><h3>{props.theMovieDbDTO.title}</h3></Card.Header>
                    <Card.Meta>{props.theMovieDbDTO.release_date}</Card.Meta>
                </Container>
                <Authorized
                    authorized={
                        <MovieRating movieToGoDTO={props.movieToGoDTO} />
                    }
                    notAuthorized={<></>}
                />

                <Authorized
                    authorized={
                        <Label attached="top right" color="yellow">
                            <Dropdown
                                item
                                trigger={<><Popup on='hover' content={props.watchListDTO ? "Add Movie to Watchlist" : "No Watchlist"} trigger={<Button circular icon='add' basic size="mini" color="vk" />} /></>}
                                icon={null}>
                                <Dropdown.Menu>
                                    {renderDropDownItems()}
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
    theMovieDbDTO: TheMovieDbDTO;
    movieToGoDTO: MovieToGoDTO;
    watchListDTO: WatchListDTO[] | undefined;
    itemId: string;
}
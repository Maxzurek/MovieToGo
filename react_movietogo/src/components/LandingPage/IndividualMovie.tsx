import { Button, Container, Label, Rating, RatingProps, Image, Card, Form, Dropdown, Popup } from "semantic-ui-react";
import { movieToGoUrlMovieVotes, theMovieDbImages } from "../../endpoints";
import Authorized from "../authentication/Authorized";
import { useEffect, useState } from "react";
import { NavigationContextState, MovieToGoDTO, MovieVoteDTO, MovieVoteUpdateDTO, TheMovieDbDTO } from "../../models/movie.models";
import { useNavigate } from "react-router-dom";
import { WatchListDTO } from "../../models/watchlist.models";
import DropDownWatchListItem from "./DropDownWatchListItem";
import MovieRating from "../utilities/MovieRating";


export default function IndividualMovie(props: IndividualMovieProps) {

    const navigate = useNavigate();
  
    const handleOnClick = () => {

        const movieDetailsData: NavigationContextState = {
            movieToGoDTO: props.movieToGoDTO,
            theMovieDbDTO: props.theMovieDbDTO,
        }

        navigate('/movie', { state: { movieDetailsData } })
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
        <Form >
            <Container >
                <Card>
                    <Card.Content>
                        <Container as={'a'} fluid onClick={handleOnClick} >
                            <Image src={theMovieDbImages + props.theMovieDbDTO.poster_path} floated='right' size='medium' />
                            <Card.Header><h3>{props.theMovieDbDTO.title}</h3></Card.Header>
                            <Card.Meta>{props.theMovieDbDTO.release_date}</Card.Meta>
                            <Label attached="top" size="huge" color="yellow">
                                {props.movieToGoDTO?.voteAverage ? `Rating: ${props.movieToGoDTO.voteAverage}/10` : "No Rating Yet"}
                            </Label>
                        </Container>
                        <Authorized
                            authorized={
                                <MovieRating  movieToGoDTO={props.movieToGoDTO} />
                            }
                            notAuthorized={<></>}
                        />

                        <Authorized
                            authorized={
                                <Label   attached="top right" color="yellow">
                                    <Dropdown
                                        item
                                        trigger={<><Popup on='hover' content={props.watchListDTO?"Add Movie to Watchlist":"No Watchlist"} trigger={<Button circular icon='add' basic size="mini" color="vk"  />} /></>}
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
            </Container>
        </Form>
    )
}

export interface IndividualMovieProps {
    theMovieDbDTO: TheMovieDbDTO;
    movieToGoDTO: MovieToGoDTO;
    watchListDTO: WatchListDTO[] | undefined;
}




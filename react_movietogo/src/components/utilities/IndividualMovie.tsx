import { Button, Container, Label, Rating, RatingProps, Image, Card, Form, Dropdown } from "semantic-ui-react";
import { movieToGoUrlMovieVotes, theMovieDbImages } from "../../endpoints";
import Authorized from "../authentication/Authorized";
import { useEffect, useState } from "react";
import { NavigationContextState, MovieToGoDTO, MovieVoteDTO, MovieVoteUpdateDTO, TheMovieDbDTO } from "../../models/movie.models";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WatchListDTO } from "../../models/watchlist.models";
import DropDownWatchListItem from "./DropDownWatchListItem";


export default function IndividualMovie(props: IndividualMovieProps) {

    const navigate = useNavigate();
    const [rating, setRating] = useState<any>(1);


    useEffect(() => {
        if (props.movieToGoDTO?.movieVote) {
            setRating(props.movieToGoDTO?.movieVote.vote)
        }
    }, [props.movieToGoDTO])

    const handleChangeOnRate = async (e: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {

        e.preventDefault();

        setRating(data.rating);

        //add Rating
        var movieVoteCreationDTO: MovieVoteDTO = {
            id: 0,
            vote: 0,
            user: undefined,
            movieId: 0
        }
        var movieVoteUpdateDTO: MovieVoteUpdateDTO = {
            vote: 0
        }

        if (props.movieToGoDTO.movieVote === undefined) {

            movieVoteCreationDTO.movieId = props.movieToGoDTO.id;

            if (data.rating && typeof data.rating === 'number') {
                movieVoteCreationDTO.vote = data.rating
            }

            console.log(movieVoteCreationDTO)
            await axios.post(movieToGoUrlMovieVotes, movieVoteCreationDTO)
                .then(response => {
                    props.movieToGoDTO.movieVote = response.data;
                })
                .catch(error => console.log(error))

        }
        else {

            //Update Rating
            if (data.rating && typeof data.rating === 'number') {
                movieVoteUpdateDTO.vote = data.rating
            }

            await axios.put(movieToGoUrlMovieVotes + `/${props.movieToGoDTO.movieVote?.id}`, { vote: data.rating })
                .then(response => {
                    props.movieToGoDTO.movieVote = response.data;
                })
                .catch(error => console.log(error))
        }
    }

    const handleOnClick = () => {

        const movieDetailsData: NavigationContextState = {
            movieToGoDTO: props.movieToGoDTO,
            theMovieDbDTO: props.theMovieDbDTO,
        }

        console.log(movieDetailsData);
        navigate('/movie', { state: { movieDetailsData } })
    }

    const renderDropDownItems = () => {
        return (
            props.watchListDTO?.map((watchList, index) => {
                return (
                    <DropDownWatchListItem key={index} movieId={props.movieToGoDTO.id} watchListDTO={watchList} />
                );
            })
        )
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
                                <Rating onRate={handleChangeOnRate}
                                    icon="star"
                                    maxRating={5}
                                    size="huge"
                                    rating={rating}
                                />
                            }
                            notAuthorized={<></>}
                        />

                        <Authorized
                            authorized={
                                <Label attached="top right" color="yellow">
                                    <Dropdown
                                        item
                                        trigger={<><Button circular icon='add' basic size="mini" color="vk" /></>}
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




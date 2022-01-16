import { Button, Container, Label, Rating, RatingProps, Image, Card, Form, Menu, Dropdown, DropdownMenu, Icon } from "semantic-ui-react";
import { movieToGoUrlMovieVotes, movieToGoUrlWatchListItems, theMovieDbImages } from "../../endpoints";
import Authorized from "../authentication/Authorized";
import { useEffect, useState } from "react";
import { MovieDetailsData, MovieToGoDTO, MovieVoteDTO, MovieVoteUpdateDTO, TheMovieDbDTO } from "../../models/movie.models";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { WatchListDTO, WatchListItemCreationDTO, WatchListItemDTO } from "../../models/watchlist.models";


export default function IndividualMovie(props: IndividualMovieProps) {

    const [error, setError] = useState<AxiosError>();
    const navigate = useNavigate();
    const [rating, setRating] = useState<any>(1);


    useEffect(() => {
        if (props.movieToGoDTO?.movieVote) {
            setRating(props.movieToGoDTO?.movieVote.vote)
        }
    }, [props.movieToGoDTO])


    useEffect(() => {
        if (props.watchListDTO) {
            // console.log(props.watchListDTO)
        }

    }, [props.watchListDTO])


    const handleChangeOnRate = async (e: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {

        e.preventDefault();

        setRating(data.rating);

        //add Rating
        var movieVoteCreatDTO: MovieVoteDTO = {
            id: 0,
            vote: 0,
            user: undefined,
            movieId: 0
        }
        var movieVoteUpdDTO: MovieVoteUpdateDTO = {
            vote: 0
        }

        if (props.movieToGoDTO.movieVote === undefined) {

            movieVoteCreatDTO.movieId = props.movieToGoDTO.id;
            if (data.rating && typeof data.rating === 'number') {
                movieVoteCreatDTO.vote = data.rating
            }

            try {
                axios.post(movieToGoUrlMovieVotes, movieVoteCreatDTO)
                    .then(response => {
                        movieVoteCreatDTO = response.data
                        // console.log(movieVoteCreatDTO)
                    })
            }
            catch (error) {
            }

        } else {

            //Update Rating
            if (data.rating && typeof data.rating === 'number') {
                movieVoteUpdDTO.vote = data.rating
            }

            try {
                axios.put(movieToGoUrlMovieVotes + `/${props.movieToGoDTO.movieVote?.id}`, { vote: movieVoteUpdDTO.vote })
                    .then(response => {
                        movieVoteCreatDTO = response.data
                    })
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleOnClick = () => {

        const movieDetailsData: MovieDetailsData = {
            movieToGoData: props.movieToGoDTO,
            theMovieDbData: props.theMovieDbDTO
        }

        console.log(movieDetailsData);
        navigate('/movie', { state: { movieDetailsData } })
    }



    const AddWatchListItem = async (watchList: WatchListDTO, movieID: number) => {

        // console.log("watchList item : " + watchList.id + " " + "Movie ID : " + movieID)

        //Create WatchListItem
        var watchListItemCreatDTO: WatchListItemCreationDTO = {
            watchListID: 0,
            movieId: 0
        }

        watchListItemCreatDTO.movieId = movieID;
        watchListItemCreatDTO.watchListID = watchList.id;

        var watchListItemDTO: WatchListItemDTO = {
            id: 0,
            watched: false,
            movie: undefined,
        }

        try {
            axios.post(movieToGoUrlWatchListItems, watchListItemCreatDTO)
                .then(response => {
                    watchListItemDTO = response.data

                    if (watchListItemDTO && props.watchListDTO) {
                        console.log(watchListItemDTO)
                        props.watchListDTO?.map((element) => {
                            if (element.id == watchList.id && element.user == watchList.user) {
                                element.watchListItems?.push(watchListItemDTO)
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }


    const MenuLink = props.watchListDTO?.map((wachList, index) => {

        var item;
        wachList.watchListItems?.map((elementItem) => {
            return item =
                elementItem.movie?.id == props.movieToGoDTO?.id ? true : false
        })

        return (
            <Dropdown.Item disabled={item} key={wachList.id} icon='list' text={wachList.name} name={wachList.name} onClick={() => AddWatchListItem(wachList, props.movieToGoDTO.id)} />
        );


    })


    return (
        <Form >
            <Container >
                <Card>
                    <Card.Content>
                        <Container
                            as={'a'}
                            fluid
                            onClick={handleOnClick} >
                            <Image src={theMovieDbImages + props.theMovieDbDTO.poster_path} floated='right' size='medium' />
                            <Card.Header><h3>{props.theMovieDbDTO.title}</h3></Card.Header>
                            <Card.Meta>{props.theMovieDbDTO.release_date}</Card.Meta>
                            <Label attached="top" size="huge" color="yellow" > {props.movieToGoDTO?.voteAverage ? `Rating :${props.movieToGoDTO.voteAverage}/10` : "No Rating Yet"} </Label>
                        </Container>
                        <Authorized authorized={<Rating onRate={handleChangeOnRate} icon="star" maxRating={5} size="huge" rating={rating} ></Rating>}
                            notAuthorized={<></>} />

                        <Authorized authorized=
                            {<Label attached="top right" color="yellow">
                                <Dropdown
                                    item
                                    trigger={<><Button circular icon='add' basic size="mini" color="vk" /></>}
                                    icon={null}>
                                    <Dropdown.Menu>
                                        {MenuLink}
                                    </Dropdown.Menu>
                                </Dropdown></Label>}
                            notAuthorized={<></>} />
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




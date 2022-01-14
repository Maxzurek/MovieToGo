import { Button, Container, Label, Popup, Rating, RatingProps, Image, Card } from "semantic-ui-react";
import { theMovieDbImages } from "../../endpoints";
import Authorized from "../authentication/Authorized";
import { useEffect, useState } from "react";
import { MovieDetailsData, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { Link, useNavigate } from "react-router-dom";

export default function IndividualMovie(props: IndividualMovieProps) {

    const navigate = useNavigate();
    const [rating, setRating] = useState<any>(1);

    const handleChangeOnRate = (e: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {
        e.preventDefault();
        setRating(data.rating);
    }


    const handleOnClick = () => {

        const movieDetailsData : MovieDetailsData = {
            movieToGoData: props.movieToGoDTO,
            theMovieDbData: props.theMovieDbDTO
        }
        
        console.log(movieDetailsData);
        navigate('/movie', { state: {movieDetailsData} })
    }


    return (
        <Container >
            <Card>
                <Card.Content>
                    <Container
                        as={'a'}
                        fluid
                        onClick={handleOnClick}
                    >
                        <Image src={theMovieDbImages + props.theMovieDbDTO.poster_path} floated='right' size='medium' />
                        <Card.Header><h3>{props.theMovieDbDTO.title}</h3></Card.Header>
                        <Card.Meta>{props.theMovieDbDTO.release_date}</Card.Meta>
                        <Label attached="top" size="huge" color="yellow" >Rating : {props.theMovieDbDTO.vote_average}/10 </Label>
                    </Container>

                    <Authorized authorized={<Rating onRate={handleChangeOnRate} icon="star" maxRating={5} size="huge" rating={rating}></Rating>}
                        notAuthorized={<></>}
                    />
                    <Authorized authorized={<Label attached="top right" color="yellow"> <Popup trigger={<Button circular icon='add' basic size="mini" color="vk" />}
                        content='Add Movie to watch list' /> </Label>}
                        notAuthorized={<></>} />
                </Card.Content>
            </Card>
        </Container>
    )
}

export interface IndividualMovieProps {
    theMovieDbDTO: TheMovieDbDTO;
    movieToGoDTO: MovieToGoDTO;

}



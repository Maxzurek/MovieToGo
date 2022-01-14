import { Button, Container, Label, Popup, Rating, RatingProps } from "semantic-ui-react";
import { theMovieDbImages } from "../../endpoints";
import { Image, Card } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import {  useState } from "react";
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { Link } from "react-router-dom";

export default function IndividualMovie(props: IndividualMovieProps) {

    const [rating, setRating] = useState<any>(1);
   // const buildLink = () => `movie/${props.movie.movieToGoId}`
    console.log(props);

    const handleChangeOnRate = (e: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {
        e.preventDefault();
        setRating(data.rating);
    }

    return (
        <Container >
            <Card>
                <Card.Content>
                    <Link to={"/movie"} state={{theMovieDbData:props.theMovieDbDTO,movieToGoData:props.movieToGoDTO}}>
                        <Image src={theMovieDbImages + props.theMovieDbDTO.poster_path} floated='right' size='medium' />
                        <Card.Header><h3>{props.theMovieDbDTO.title}</h3></Card.Header>
                        <Card.Meta>{props.theMovieDbDTO.release_date}</Card.Meta>
                        <Label attached="top" size="huge" color="yellow" >Rating : {props.theMovieDbDTO.vote_average}/10 </Label>
                    </Link>

                    <Authorized authorized={<Rating onRate={handleChangeOnRate} icon="star"  maxRating={5} size="huge" rating={rating}></Rating>}
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
    movieToGoDTO : MovieToGoDTO;

}

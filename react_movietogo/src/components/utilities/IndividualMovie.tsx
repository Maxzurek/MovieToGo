import { Button, Container, Label, Popup, Rating, RatingProps } from "semantic-ui-react";
import { theMovieDbImages } from "../../endpoints";
import { Image, Card } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import { movieCardDTO } from "../../models/movie.models";
import { SetStateAction, useState } from "react";

export default function IndividualMovie(props: IndividualMovieProps) {

    const [rating, setRating] = useState<any>(1);
    const buildLink = () => `movie/${props.movie.id}`
    console.log(props);

    const handleChangeOnRate = (e: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {
        e.preventDefault();
        setRating(data.rating);
    }

    return (
        <Container >
            <Card>
                <Card.Content>
                    <a href={buildLink()}>
                        <Image src={theMovieDbImages + props.movie.poster_path} floated='right' size='medium' />
                        <Card.Header><h3>{props.movie.title}</h3></Card.Header>
                        <Card.Meta>{props.movie.release_date}</Card.Meta>
                        <Label attached="top" size="huge" color="yellow" >Rating : {props.movie.vote_average}/10 </Label>
                    </a>

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
    movie: movieCardDTO;

}

import { Button, Container, Label, Popup, Rating } from "semantic-ui-react";
import { theMovieDbImages } from "../../endpoints";
import { Image, Card, Icon } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import { useState } from "react";

export default function IndividualMovie(props: movieDTO) {
    
    const buildLink = () => `/movie/${props.movie.id}`

    console.log(props);

    return (
        <Container >
            <Card>
                <Card.Content>
                    <a href={buildLink()}>
                        <Image src={theMovieDbImages + props.movie.poster_path} floated='right' size='medium' />
                        <Card.Header><h3>{props.movie.title}</h3></Card.Header>
                        <Card.Meta>{props.movie.release_date}</Card.Meta>
                        <Label attached="top" size="huge" color="yellow" >Rating : {props.movie.vote_average}/10 </Label>
                        <Authorized authorized={<Rating icon="star" minRating={1} maxRating={5} size="huge" rating={props.movie.vote_average}></Rating>} 
                                    notAuthorized={<></>}
                        />
                    </a>
                   <Authorized authorized={<Label attached="top right" color="yellow"> <Popup trigger={<Button circular icon='add' basic size="mini" color="vk" />} content='Add Movie to watch list' /> </Label>} 
                               notAuthorized={<></>}/>
                </Card.Content>
            </Card>


        </Container>
    )
}

export interface movieDTO {
    movie: any;

}

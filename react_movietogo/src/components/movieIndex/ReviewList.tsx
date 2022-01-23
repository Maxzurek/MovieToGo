import { Card, Container, Icon } from "semantic-ui-react";
import { MovieReviewDTO } from "../../models/movie.models";

interface reviewListProps {
    movieReviewDTO: MovieReviewDTO
}

export default function ReviewList(props: reviewListProps) {


    const formatDate = (dateString: string) => {
        
        const options: Intl.DateTimeFormatOptions = { //Typescript ways of adding the type
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString([], options);
    };



    const renderReviewCard = () => {
        return (
            <Card>
                <Card.Content >
                    <Icon name='user' size="large" /> {props.movieReviewDTO.user.userName}
                    <Card.Description as='h3' >
                        {props.movieReviewDTO.body}
                    </Card.Description>
                    <Card.Content extra>
                        <Card.Meta as='h2'>{formatDate(props.movieReviewDTO.dateCreated.toString())}</Card.Meta>
                    </Card.Content>
                </Card.Content>
            </Card>

        )
    }

    return (
        <>
            {renderReviewCard()}

        </>
    )




}
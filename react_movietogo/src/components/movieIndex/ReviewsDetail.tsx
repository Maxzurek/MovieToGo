import { Container, Grid } from "semantic-ui-react"
import { MovieToGoDTO } from "../../models/movie.models"
import ReviewList from "./ReviewList"



interface listReviewsProps {
    movieToGoDTO: MovieToGoDTO | undefined;
}

export default function ReviewsDetail(props: listReviewsProps) {

    const renderGridColumn = () => {

        if (props.movieToGoDTO?.movieReviews) {

            return (
                    props.movieToGoDTO.movieReviews.map((review, index) =>

                        <Grid.Column key={index}>
                            <ReviewList
                                key={index}
                                movieReviewDTO={review}
                            />
                        </Grid.Column>
                    )
            )
        }
    }

    return (
        <>
            <Grid columns={3} container doubling stackable>
                {renderGridColumn()}
            </Grid>
        </>
    )
}
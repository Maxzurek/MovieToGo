import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { Container, Header, Message, Rating, Segment } from "semantic-ui-react";
import { movieToGoUrlMovieReviews } from "../../endpoints";
import { MovieReviewCreationDTO, MovieToGoDTO } from "../../models/movie.models";
import Authorized from "../authentication/Authorized";
import ReviewForm from "../forms/ReviewForm";


import DisplayApiErrors from "../utilities/DisplayApiErrors";
import MovieRating from "../utilities/MovieRating";
import ReviewsDetail from "./ReviewsDetail";


interface reviewRatingProps {
    movieToGoDTO: MovieToGoDTO | undefined;
}

export default function ReviewRating(props: reviewRatingProps) {

    const [movieReviwErrors, setMovieReviewErrors] = useState<any>(undefined);
    const [reviewSubmissionSuccessMsg, setReviewSubmissionSuccessMsg] = useState('');



    const onSubmitReview = async (values: MovieReviewCreationDTO, Actions: FormikHelpers<MovieReviewCreationDTO>) => {

        try {

            if (props.movieToGoDTO) {

                values.movieId = props.movieToGoDTO.id
                values.dateCreated = new Date()

                await axios.post(movieToGoUrlMovieReviews, values)
                    .then(response => {
                        props.movieToGoDTO?.movieReviews?.push(response.data);
                    })

                setMovieReviewErrors(undefined)
                setReviewSubmissionSuccessMsg('');
                setReviewSubmissionSuccessMsg('Review submitted!');
            }

        } catch (error) {
            setMovieReviewErrors(error)
        }

    }

    const reviewCreationDTO: MovieReviewCreationDTO = {
        body: "",
        dateCreated: "",
        movieId: 0
    }
    return (
        <>
            <Container>
                <Authorized
                    authorized={
                        <>
                            <Segment textAlign="center" ><Header as="h3" color="teal"> RATE AND REVIEW </Header> 
                            </Segment>
                            <ReviewForm model={reviewCreationDTO} onSubmit={onSubmitReview} />
                            <DisplayApiErrors error={movieReviwErrors} />
                            {reviewSubmissionSuccessMsg ? <Container textAlign="center"><Message positive>{reviewSubmissionSuccessMsg}</Message></Container> : undefined}
                            <br /> <br />

                            <Container>
                                <Header textAlign="center" as="h3" color="teal">Your Rating  : <MovieRating movieToGoDTO={props.movieToGoDTO} /> </Header>
                            </Container>

                            <br /> <br />
                            <Segment textAlign="center"><Header as="h3" color="teal">{props.movieToGoDTO?.movieReviews?.length ? "CRITIC REVIEWS FOR MOVIE" : "NO REVIEWS YET"}  </Header> </Segment>
                            <br />

                            <ReviewsDetail movieToGoDTO={props.movieToGoDTO} />
                        </>
                    }
                    notAuthorized={
                        <>
                            <br /> <br />
                            <Segment textAlign="center">
                                <Header as="h3" color="teal">{props.movieToGoDTO?.movieReviews?.length ? "CRITIC REVIEWS FOR MOVIE" : "NO REVIEWS YET"}</Header> </Segment>
                            <br />
                            <ReviewsDetail movieToGoDTO={props.movieToGoDTO} />
                        </>} />
            </Container>
        </>

    )
}
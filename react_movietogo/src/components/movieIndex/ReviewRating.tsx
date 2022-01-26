import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { Container, Message, Rating, Segment } from "semantic-ui-react";
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

    const [movieReviwErrors, setMovieReviewErrors] = useState<any>({});
    const [reviewSubmissionSuccessMsg, setReviewSubmissionSuccessMsg] = useState('');



    const onSubmitReview = async (values: MovieReviewCreationDTO, Actions: FormikHelpers<MovieReviewCreationDTO>) => {

        try {

            if (props.movieToGoDTO) {

                values.movieId = props.movieToGoDTO.id
                values.dateCreated = new Date()
                //console.log("values")

                await axios.post(movieToGoUrlMovieReviews, values)
                    .then(response => {
                        props.movieToGoDTO?.movieReviews?.push(response.data);
                    })

                setMovieReviewErrors({})
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
                            <Segment textAlign="center"><h3> RATE AND REVIEW </h3>
                            </Segment>
                            <br />
                            <Container>
                                <h3>Your Rating  : <MovieRating movieToGoDTO={props.movieToGoDTO} /> </h3>
                            </Container>
                            <br />
                            <ReviewForm model={reviewCreationDTO} onSubmit={onSubmitReview} />
                            <DisplayApiErrors error={movieReviwErrors} />
                            {reviewSubmissionSuccessMsg ? <Container textAlign="center"><Message positive>{reviewSubmissionSuccessMsg}</Message></Container> : undefined}
                            <br /> <br />
                            <Segment textAlign="center"><h3> CRITIC REVIEWS FOR MOVIE </h3> </Segment>
                            <br />
                            <ReviewsDetail movieToGoDTO={props.movieToGoDTO} />
                        </>
                    }
                    notAuthorized={
                        <>
                            <br /> <br />
                            <Segment textAlign="center"><h3> CRITIC REVIEWS FOR MOVIE </h3> </Segment>
                            <br />
                            <ReviewsDetail movieToGoDTO={props.movieToGoDTO} />
                        </>} />
            </Container>
        </>

    )
}
import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { Container, Message, Segment } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate, movieToGoUrlMovieVotes } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
import { MovieVoteCreationDTO } from "../../models/movievotes.models";
import MovieVoteFormTest from "../forms/MovieVoteFormTest";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";

export default function TestFormsTool() {

    const [userCreationError, setUserCreationError] = useState<any>({});
    const [movieVoteErrors, setMovieVoteErrors] = useState<any>({});
    const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState('');
    const [voteSubmissionSuccessMessage, setVoteSubmissionSuccessMessage] = useState('');

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {

        try {
            await axios.post(movieToGoUrlAccountsCreate, values);
            setUserCreationError({});
            setRegistrationSuccessMessage('Registration complete!');
        }
        catch (error: any) {
            setUserCreationError(error);
        }
    }

    const submitVote = async (values: MovieVoteCreationDTO, actions: FormikHelpers<MovieVoteCreationDTO>) => {

        try{
            await axios.post(movieToGoUrlMovieVotes, values);
            setMovieVoteErrors({});
            setVoteSubmissionSuccessMessage('Vote submitted!');
        }
        catch(error){
            setMovieVoteErrors(error);
        }
    }

    const userCreationDTO: UserCreationDTO = {
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
    }

    const movieVoteCreationDTO: MovieVoteCreationDTO = {
        vote: 0,
        movieId: 0,
    }

    return (
        <Container>
            <Container textAlign="center">
                <h1>Test Forms Tool</h1>
            </Container>
            <Segment>
                <h3>Registration Form</h3>
                <RegisterForm model={userCreationDTO} onSubmit={registerUser} />
                <DisplayApiErrors error={userCreationError} />
                {registrationSuccessMessage ? <Container textAlign="center"><Message positive>{registrationSuccessMessage}</Message></Container> : undefined}
            </Segment>
            <Segment>
                <h3>Movie Vote Form</h3>
                <MovieVoteFormTest model={movieVoteCreationDTO} onSubmit={submitVote}/>
                <DisplayApiErrors error={movieVoteErrors} />
                {voteSubmissionSuccessMessage ?<Container textAlign="center"><Message positive>{voteSubmissionSuccessMessage}</Message></Container> : undefined}
            </Segment>
        </Container>
    )
};

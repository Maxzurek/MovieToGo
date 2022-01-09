import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
import { MovieVoteCreationDTO } from "../../models/movievotes.models";
import MovieVoteFormTest from "../forms/MovieVoteFormTest";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";

export default function TestFormsTool() {

    const [userCreationError, setUserCreationError] = useState<any>({});
    const [movieVoteErrors, setMovieVoteErrors] = useState<any>({});
    const navigate = useNavigate();

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {

        //setUserCreationError([]);

        try {
            await axios.post(movieToGoUrlAccountsCreate, values)
            navigate('/dev');
        }
        catch (error: any) {
            setUserCreationError(error);
        }
    }

    const submitVote = async () => {
        try{

        }
        catch(error){

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
            </Segment>
            <Segment>
                <h3>Movie Vote Form</h3>
                <MovieVoteFormTest model={movieVoteCreationDTO} onSubmit={submitVote}/>
                <DisplayApiErrors error={movieVoteErrors} />
            </Segment>
        </Container>
    )
};

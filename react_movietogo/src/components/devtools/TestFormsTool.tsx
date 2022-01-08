import axios, { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";

export default function TestFormsTool() {

    const [userCreationError, setUserCreationError] = useState<any>({});
    const navigate = useNavigate();

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {
        
        //setUserCreationError([]);

        try{
            await axios.post(movieToGoUrlAccountsCreate, values)
            navigate('/dev');
        }
        catch (error: any){
            setUserCreationError(error);
        }
    }

    const userCreationDTO = {
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: ''
    }

    return (
        <Container>
            <h1>Test Forms Tool</h1>
            <Container>
                <DisplayApiErrors error={userCreationError}/>
                <RegisterForm model={userCreationDTO} onSubmit={registerUser}/>
            </Container>
        </Container>
    )
};

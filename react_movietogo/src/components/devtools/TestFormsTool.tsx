import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
import RegisterForm from "../forms/RegisterForm";

export default function TestFormsTool() {

    const [userCreationError, setUserCreationError] = useState([]);
    const navigate = useNavigate();
    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {
        console.log(values)

        try{
            await axios.post(movieToGoUrlAccountsCreate, values)
            navigate('/dev');
        }
        catch (error: any){
            console.log("Status Code: "+error.response.status);
            setUserCreationError(error.response.data);
            console.log(userCreationError);
        }
    }

    const userCreationDTO = {
        userName: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    }

    return (
        <Container>
            <h1>Test Forms Tool</h1>
            <Container>
                <RegisterForm model={userCreationDTO} onSubmit={registerUser}/>
            </Container>
        </Container>
    )
};

import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Icon, MenuItem, Modal } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";

interface AuthenticationProps {
    size: string;
}

Authentication.defaultProps = {
    size: 'tiny'
}

export default function Authentication(props: AuthenticationProps) {

    const [open, setOpen] = useState(false)
    const [userCreationError, setUserCreationError] = useState<any>({});
    const navigate = useNavigate();

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {
        
        try{
            await axios.post(movieToGoUrlAccountsCreate, values)
            setOpen(false);
            //navigate('/');
        }
        catch (error: any){
            setUserCreationError(error);
        }
    }

    const userCreationDTO  = {
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: ''
    }

    return (
        <MenuItem
            as={Modal}
            size={props.size}
            trigger={<MenuItem>Sign Up</MenuItem>}
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open= {open}
        >
            <Header icon='user plus' content='Sign Up' />
            <Modal.Content>
                <RegisterForm model={userCreationDTO} onSubmit={registerUser} formId="registerForm"/>
                <DisplayApiErrors error={userCreationError}/>
            </Modal.Content>
            <Modal.Actions>
                Already have an account? <a>Sign In</a>
                <Button color='green' inverted type='submit' form='registerForm'>
                    <Icon name='checkmark' /> Register
                </Button>
            </Modal.Actions>
        </MenuItem>
    )
};

import axios from "axios";
import { FormikHelpers } from "formik";
import React, { useState } from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";

interface AuthenticationModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
    blurred: true
}

AuthenticationModal.defaultProps = {
    size: 'tiny'
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
    const [userCreationError, setUserCreationError] = useState<any>({});

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {

        try {
            await axios.post(movieToGoUrlAccountsCreate, values)
            props.setOpen(false);
        }
        catch (error: any) {
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
        <Modal
            size={props.size}
            closeIcon
            {...(props.blurred ? { dimmer: 'blurring' } : {})}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            open={props.open}
        >
            <Header icon='user plus' content='Sign Up' />
            <Modal.Content>
                <RegisterForm model={userCreationDTO} onSubmit={registerUser} formId="registerForm" />
                <DisplayApiErrors error={userCreationError} />
            </Modal.Content>
            <Modal.Actions>
                Already have an account? <a>Sign In</a>
                <Button color='green' inverted type='submit' form='registerForm'>
                    <Icon name='checkmark' /> Register
                </Button>
            </Modal.Actions>
        </Modal>
    )
};

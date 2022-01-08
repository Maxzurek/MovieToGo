import axios from "axios";
import { FormikHelpers } from "formik";
import React, { useState } from "react";
import { Modal, Header, Button, Icon, Segment } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate, movieToGoUrlAccountsLogin } from "../../endpoints";
import { AuthenticationResponse, UserCreationDTO, UserLoginDTO } from "../../models/authentication.models";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";

interface AuthenticationModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    blurred: true;
    size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
    defaultSelection?: 'signIn' | 'signUp';
}

AuthenticationModal.defaultProps = {
    size: 'tiny',
    defaultSelection: 'signIn',
}

export default function AuthenticationModal(props: AuthenticationModalProps) {

    const [apiErrors, setApiErrors] = useState<any>({});
    const [selection, setSelection] = useState(props.defaultSelection);

    const SIGN_IN = 'signIn';
    const SIGN_UP = 'signUp';

    const handleItemClick = (e: any, { name }: any) => {
        switch (name) {
            case 'signIn':
                setSelection(SIGN_IN);
                break;
            case 'signUp':
                setSelection(SIGN_UP);
                break;
            case 'close':
                setApiErrors({});
                props.setOpen(false);
                break;
            default:
                break;
        }
    }

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {

        setApiErrors({});

        try {
            await axios.post<AuthenticationResponse>(movieToGoUrlAccountsCreate, values)
            props.setOpen(false);
        }
        catch (error: any) {
            setApiErrors(error);
        }
    }

    const attemptLogin = async (values: UserLoginDTO, actions: FormikHelpers<UserLoginDTO>) => {

        setApiErrors({});

        try {
            var response = await axios.post<AuthenticationResponse>(movieToGoUrlAccountsLogin, values)
            props.setOpen(false);
            console.log(response.data);
        }
        catch (error: any) {
            setApiErrors(error);
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

    const userLoginDTO = {
        emailOrUserName: '',
        password: ''
    }

    return (
        <Modal
            size={props.size}
            {...(props.blurred ? { dimmer: 'blurring' } : {})}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            open={props.open}
        >
            <Header size="tiny" textAlign="right" color="grey">
                <Icon name="close" link onClick={handleItemClick}></Icon>
            </Header>
            <Modal.Content>
                <Segment color="grey">
                    <Button.Group attached="bottom" size="large" >
                        <Button name='signIn' onClick={handleItemClick} active={selection === SIGN_IN}>Sign In</Button>
                        <Button.Or text='or' />
                        <Button name='signUp' onClick={handleItemClick} active={selection === SIGN_UP}>Sign Up</Button>
                    </Button.Group>
                    {selection === SIGN_IN ?
                        <LoginForm
                            model={userLoginDTO}
                            onSubmit={attemptLogin}
                            className="authentication_popup_form"
                        />
                        :
                        <RegisterForm
                            model={userCreationDTO}
                            onSubmit={registerUser}
                            className="authentication_popup_form"
                        />
                    }
                    {/* <Divider horizontal>Or</Divider> */}
                </Segment>
                <DisplayApiErrors error={apiErrors} />
            </Modal.Content>
        </Modal>
    )
};

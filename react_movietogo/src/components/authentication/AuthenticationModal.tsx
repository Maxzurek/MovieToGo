import axios from "axios";
import { FormikHelpers } from "formik";
import React, { useContext, useState } from "react";
import { Modal, Header, Button, Icon, Segment } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate, movieToGoUrlAccountsLogin } from "../../endpoints";
import { AuthenticationResponse, UserCreationDTO, UserLoginDTO } from "../../models/authentication.models";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import DisplayApiErrors from "../utilities/DisplayApiErrors";
import AuthenticationContext from "./AuthenticationContext";
import { getClaims, saveToken } from "./handleJWT";

interface AuthenticationModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultSelection: 'login' | 'register';
    blurred: true;
    size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
}

AuthenticationModal.defaultProps = {
    size: 'tiny',
}

export default function AuthenticationModal(props: AuthenticationModalProps) {

    const { update } = useContext(AuthenticationContext);

    const [apiErrors, setApiErrors] = useState<any>({});
    const [selection, setSelection] = useState(props.defaultSelection);

    const LOGIN = 'login';
    const REGISTER = 'register';

    const handleItemClick = (e: any, { name }: any) => {
        switch (name) {
            case LOGIN:
                setSelection(LOGIN);
                break;
            case REGISTER:
                setSelection(REGISTER);
                break;
            case 'close':
                setApiErrors({});
                setSelection(props.defaultSelection);
                props.setOpen(false);
                break;
            default:
                break;
        }
    }

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {

        setApiErrors({});

        try {
            var response = await axios.post<AuthenticationResponse>(movieToGoUrlAccountsCreate, values);
            saveToken(response.data);
            update(getClaims());
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
            saveToken(response.data);
            update(getClaims());
            props.setOpen(false);
        }
        catch (error: any) {
            console.log(error);
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
                        <Button name={LOGIN} onClick={handleItemClick} active={selection === LOGIN}>Login</Button>
                        <Button.Or text='or' />
                        <Button name={REGISTER} onClick={handleItemClick} active={selection === REGISTER}>Register</Button>
                    </Button.Group>
                    {selection === LOGIN ?
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

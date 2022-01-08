import axios from "axios";
import { FormikHelpers } from "formik";
import React, { useState } from "react";
import { Modal, Header, Button, Icon, Segment } from "semantic-ui-react";
import { movieToGoUrlAccountsCreate } from "../../endpoints";
import { UserCreationDTO } from "../../models/authentication.models";
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

    const [userCreationError, setUserCreationError] = useState<any>({});
    const [selection, setSelection] = useState(props.defaultSelection);
    const [isSubmiting, setIsSubmiting] = useState(false);

    const SIGN_IN = 'signIn';
    const SIGN_UP = 'signUp';

    const handleItemClick = (e: any, { name }: any) => {
        switch (name) {
            case 'signIn':
                console.log(SIGN_IN);
                setSelection(SIGN_IN);
                break;
            case 'signUp':
                console.log(SIGN_UP);
                setSelection(SIGN_UP);
                break;
            case 'close':
                setUserCreationError({});
                props.setOpen(false);
                break;
            default:
                break;
        }
    }

    const registerUser = async (values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>) => {

        console.log('registerUser');

        setIsSubmiting(true);
        setUserCreationError({});

        try {
            await axios.post(movieToGoUrlAccountsCreate, values)
            props.setOpen(false);
            setIsSubmiting(false);
        }
        catch (error: any) {
            setUserCreationError(error);
            setIsSubmiting(false);
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
                        <Button name='signIn' onClick={handleItemClick}>Sign In</Button>
                        <Button.Or text='or' />
                        <Button name='signUp' onClick={handleItemClick}>Sign Up</Button>
                    </Button.Group>
                    {selection === SIGN_IN ?
                        undefined
                        :
                        <RegisterForm
                            model={userCreationDTO}
                            onSubmit={registerUser}
                            formId="registerForm"
                            className="authentication_popup"
                        />
                    }
                    {/* <Divider horizontal>Or</Divider> */}
                </Segment>
                <DisplayApiErrors error={userCreationError} />
            </Modal.Content>
        </Modal>
    )
};

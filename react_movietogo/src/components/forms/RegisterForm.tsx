import { Formik, Form, FormikHelpers } from "formik";
import { UserCreationDTO } from "../../models/authentication.models";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import TextField from "../utilities/TextField";

interface RegisterFormProps {
    model: UserCreationDTO;
    onSubmit(values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>): void;
}

export default function RegisterForm(props: RegisterFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                userName: Yup.string().required('This field is required'),
                password: Yup.string().required('This field is required'),
                email: Yup.string().required('This field is required').email('Please enter a valid email'),
                firstName: Yup.string().required('This field is required'),
                lastName: Yup.string().required('This field is required'),
            })}
        >
            {formikProps => (
                <Form>
                    <TextField  field="userName" displayName="Username"/>
                    <TextField  field="password" displayName="Password" type="password"/>
                    <TextField  field="email" displayName="Email"/>
                    <TextField  field="firstName" displayName="First name"/>
                    <TextField  field="lastName" displayName="Last name"/>
                    <Button disabled={formikProps.isSubmitting} type='submit'>Register</Button>
                </Form>
            )}
        </Formik>
    )
};

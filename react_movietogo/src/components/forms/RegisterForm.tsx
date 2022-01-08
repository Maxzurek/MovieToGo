import { Formik, FormikHelpers } from "formik";
import { UserCreationDTO } from "../../models/authentication.models";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
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
            validationSchema={
                Yup.object(
                    {
                        userName: Yup.string().required('This field is required'),
                        password: Yup.string().required('This field is required'),
                        confirmPassword: Yup.string()
                            .required('This field is required')
                            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                        email: Yup.string().required('This field is required').email('Please enter a valid email'),
                        firstName: Yup.string().required('This field is required'),
                        lastName: Yup.string().required('This field is required'),
                    })}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit}>
                    <TextField field="email" displayName="Email" formikProps={formikProps} size='large' />
                    <TextField field="firstName" displayName="First name" formikProps={formikProps} size='large' />
                    <TextField field="lastName" displayName="Last name" formikProps={formikProps} size='large' />
                    <TextField field="userName" displayName="Username" formikProps={formikProps} size='large' />
                    <TextField field="password" displayName="Password" type="password" formikProps={formikProps} size='large' />
                    <TextField field="confirmPassword" displayName="Confirm password" type="password" formikProps={formikProps} size='large' />
                    <Button disabled={formikProps.isSubmitting} type='submit' positive>Register</Button>
                </Form>

            )}
        </Formik>
    )
};

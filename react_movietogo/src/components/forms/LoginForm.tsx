import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Form, Segment, Button } from "semantic-ui-react";
import { UserLoginDTO } from "../../models/authentication.models";
import FormTextField from "../utilities/FormTextField";

interface LoginFormProps {
    model: UserLoginDTO;
    onSubmit(values: UserLoginDTO, actions: FormikHelpers<UserLoginDTO>): void;
    formId?: string;
    className?: string;
}

export default function LoginForm(props: LoginFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object(
                    {
                        emailOrUserName: Yup.string().required('This field is required'),
                        password: Yup.string().required('This field is required'),
                    })}
        >
            {formikProps => (
                <Form id={props.formId} onSubmit={formikProps.handleSubmit} className={props.className}>
                    <FormTextField
                        field="emailOrUserName"
                        displayName="Email or Username"
                        formikProps={formikProps}
                        size='large'
                        icon="user outline"
                    />
                    <FormTextField
                        field="password"
                        displayName="Password"
                        type="password"
                        formikProps={formikProps}
                        size='large'
                        icon="lock"
                    />
                    <Segment basic>
                        <Button
                            color='green'
                            inverted type='submit'
                            icon='unlock'
                            content='Login'
                            fluid
                            {...(formikProps.isSubmitting ? { loading: true } : undefined)}
                        />
                    </Segment>
                </Form>
            )}
        </Formik>
    )
};

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Segment, Button, Form, Rating } from "semantic-ui-react";
import CustomFormField from "../utilities/CustomFormField";
import { MovieVoteCreationDTO } from "../../models/movie.models";

interface MovieVoteFormTestProps{
    model: MovieVoteCreationDTO;
    onSubmit(values: MovieVoteCreationDTO, actions: FormikHelpers<MovieVoteCreationDTO>): void;
}

export default function MovieVoteFormTest(props: MovieVoteFormTestProps) {
    return(
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object(
                    {
                        vote: Yup.number().typeError("Must be a number").required('This field is required'),
                        movieId: Yup.number().typeError("Must be a number").required('This field is required'),
                    })}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit} >
                    <CustomFormField
                        field="movieId"
                        displayName="Movie Id"
                        type="number"
                        value={formikProps.values.movieId}
                        formikProps={formikProps}
                        size='large'
                    />
                    <CustomFormField
                        field="vote"
                        displayName="Vote"
                        type="number"
                        value={formikProps.values.vote}
                        formikProps={formikProps}
                        size='large'
                    />
                    <Rating icon="star" maxRating={5} size="huge" rating={formikProps.values.vote}></Rating>
                    <Segment basic>
                        <Button
                            color='green'
                            inverted type='submit'
                            icon='check'
                            content='Submit Vote'
                            fluid
                            {...(formikProps.isSubmitting ? { loading: true } : undefined)}
                        />
                    </Segment>
                </Form>
            )}
        </Formik>
    )
};

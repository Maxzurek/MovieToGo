import { Field, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Button, Container, Form, Message, Rating, Segment, TextArea } from "semantic-ui-react"
import { MovieReviewCreationDTO, MovieReviewDTO } from "../../models/movie.models";
import * as Yup from "yup";
import CustomFormField from "../utilities/CustomFormField";


interface reviewFormProps {
    model: MovieReviewCreationDTO;
    onSubmit(values: MovieReviewCreationDTO, actions: FormikHelpers<MovieReviewCreationDTO>): void;
}

export default function ReviewForm(props: reviewFormProps) {

    // const [rating, setRating] = useState<any>(1);
    // const handleChangeOnRate = () => { }

    //console.log("values")

    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object(
                    {
                        body: Yup.string().required('This field is required')
                    })}>

            {formikProps => (

                <Form onSubmit={formikProps.handleSubmit} >

                    <TextArea
                        onChange={formikProps.handleChange}
                        name="body"
                        label="Review"
                        placeholder='What did you think of the movie? (optional)'

                    />
                    {formikProps.errors.body ? <Message negative content={formikProps.errors.body} /> : undefined}
                    <Segment basic>
                        <Button size="small"
                            color='orange'
                            inverted type='submit'
                            icon='check'
                            content='Submit Review'
                            fluid
                            {...(formikProps.isSubmitting ? { loading: true } : undefined)}
                        />
                    </Segment>
                </Form>
            )}
        </Formik>

    )
}
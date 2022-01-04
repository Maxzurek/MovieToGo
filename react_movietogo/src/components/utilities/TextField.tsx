import { ErrorMessage, Field } from "formik";
import { Container, Input, Label, Message } from "semantic-ui-react";

interface TextFieldProps {
    field: string;
    displayName: string;
    type: 'text' | 'password'
}

TextField.defaultProps = {
    type: 'text'
}

export default function TextField(props: TextFieldProps) {

    const TextInput = (field: any, form: any, ...props : any) => {
        return(
            <>
                <Input onChange={(e, data) => {form.setFieldValue(props.field, data.value); console.log(data.va)}}/>
            </>
        )
    } 

    return (
        <Container>
            <Label>{props.displayName}</Label>
            <br/>
            <Field name={props.field} id={props.field} className="form-control" type={props.type} />
            <ErrorMessage name={props.field}>{msg => <Container><Label pointing basic color='red'>{msg}</Label></Container>}</ErrorMessage>
        </Container>
    )
};

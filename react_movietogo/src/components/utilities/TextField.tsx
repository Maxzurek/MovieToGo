import { ErrorMessage, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { Container, FormField, Input, Label } from "semantic-ui-react";

interface TextFieldProps {
    formikProps? : FormikProps<any>;
    field: string;
    displayName: string;
    type: 'text' | 'password'
    size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive'
}

TextField.defaultProps = {
    type: 'text',
    size: 'small'
}

export default function TextField(props: TextFieldProps) {

    const [inputType, setInputType] = useState('text');
    const [isTypePassword, setTypePassword] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [icon, setIcon] = useState('eye');

    const handleOnCLick = () => {
        if(hidePassword){
            setHidePassword(false);
            setIcon('eye slash');
            setInputType('text');
        }
        else{
            setHidePassword(true);
            setIcon('eye');
            setInputType('password');
        }
    }

    useEffect(()=>{
        if(props.type === 'password'){
            setTypePassword(true)
            setInputType('password');
        }
    }, [])

    return (
        <>
            <FormField>
                <label>{props.displayName}</label>
                <Input 
                    size={props.size}
                    name={props.field} 
                    id={props.field} 
                    type={inputType}
                    onChange={props.formikProps?.handleChange}
                    action = {isTypePassword ? {
                        icon: icon,
                        onClick: handleOnCLick,
                        type: "button"
                    } : undefined}
                />
            </FormField>
            <ErrorMessage name={props.field}>{msg => <Container><Label pointing basic color='red'>{msg}</Label></Container>}</ErrorMessage>
        </>
    )
};

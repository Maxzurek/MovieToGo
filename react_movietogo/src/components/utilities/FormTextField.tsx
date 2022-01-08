import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { FormField, Input } from "semantic-ui-react";

interface FormTextFieldProps {
    formikProps: FormikProps<any>;
    field: string;
    displayName: string;
    type: 'text' | 'password';
    size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
    icon?: string;
}

FormTextField.defaultProps = {
    type: 'text',
    size: 'small'
}

export default function FormTextField(props: FormTextFieldProps) {

    const [fieldError, setFieldError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputStyle, setInputStyle] = useState({});
    const [inputType, setInputType] = useState('text');
    const [isTypePassword, setTypePassword] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [icon, setIcon] = useState('eye');

    const handleOnCLick = () => {

        if (hidePassword) {
            setHidePassword(false);
            setIcon('eye slash');
            setInputType('text');
        }
        else {
            setHidePassword(true);
            setIcon('eye');
            setInputType('password');
        }
    }

    useEffect(() => {

        var error;
        var errorMessage;
        var touched = Object.keys(props.formikProps.touched).find(key => key === props.field);
        console.log('Touched: '+touched);

        for (const [key, value] of Object.entries(props.formikProps.errors)) {

            console.log('Key: '+key+' | Field: '+props.field);
            console.log(value);

            if (key === props.field) {
                error = key;
                errorMessage = value;
            }
        }

        if (error && touched) {
            setFieldError(true);
            setErrorMessage(errorMessage as string);
            setInputStyle({ border: '1px solid red' });
        }
        else {
            setFieldError(false);
            setErrorMessage('');
            setInputStyle({});
        }

    }, [props.formikProps])

    useEffect(() => {

        if (props.type === 'password') {
            setTypePassword(true)
            setInputType('password');
        }

    }, [])

    return (
        <>
            <FormField>
                <label>{props.displayName}</label>
                <Input
                    style={inputStyle}
                    {...(props.icon ? { icon: props.icon } : {})}
                    {...(props.icon ? { iconPosition: "left" } : {})}
                    size={props.size}
                    name={props.field}
                    id={props.field}
                    type={inputType}
                    onChange={props.formikProps?.handleChange}
                    action={isTypePassword ? {
                        icon: icon,
                        onClick: handleOnCLick,
                        type: "button"
                    } : undefined}
                />
                {fieldError ? <label style={{ color: 'red' }}>{errorMessage}</label> : undefined}
            </FormField>
        </>
    )
};

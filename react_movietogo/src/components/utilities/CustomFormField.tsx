import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { FormField, Input } from "semantic-ui-react";

interface CustomFormFieldProps {
    value: any;
    formikProps: FormikProps<any>;
    field: string;
    displayName: string;
    size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
    type?: string;
    icon?: string;
}

FormField.defaultProps = {
    type: 'text',
    size: 'small',
}

export default function CustomFormField(props: CustomFormFieldProps) {

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
        var touched = Object.keys(props.formikProps.touched).find(key => key === props.field)!;

        for (const [key, value] of Object.entries(props.formikProps.errors)) {

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

    }, [props.formikProps, props.field, props.type])

    useEffect(() => {

        setInputType(props.type!);

        if (props.type === 'password') {
            setTypePassword(true)
        }

    }, [props.type])

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
                    value={props.value}
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

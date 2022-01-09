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

    const [errorMessage, setErrorMessage] = useState<string>('');
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
            setErrorMessage(errorMessage?.toString()!);
        }
        else {

            setErrorMessage('');
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
            <FormField
                control={Input} 
                label={props.displayName}
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
                error={errorMessage ? {content: errorMessage} : undefined}
            />
        </>
    )
};

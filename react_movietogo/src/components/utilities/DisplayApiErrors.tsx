import { AxiosError, AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Container, Message } from "semantic-ui-react";

interface ApiErrorsProps {
    error: AxiosError;
    id?: number;
}

export default function DisplayApiErrors(props: ApiErrorsProps) {

    const [message, setMessage] = useState<ReactElement>(<></>);


    const getError400MessageComponent = (response: AxiosResponse): ReactElement => {
        return (
            <Message negative>
                <ul>{response.data.map((error: any, index: number) => <li key={index}>{error}</li>)}</ul>
            </Message>
        )
    }

    const getError401MessageComponent = (): ReactElement => {

        const UNAUTHORIZED_ERR_MESSAGE = 'Error 401 - Unauthorized';

        return (
            <Container textAlign="center" fluid>
                <Message negative>{UNAUTHORIZED_ERR_MESSAGE}</Message>
            </Container>
        )
    }

    const getError500MessageComponent = (): ReactElement => {

        const SERVER_ERR_MESSAGE = 'Internal Server Error - Please try again later.'

        return (
            <Container textAlign="center" fluid>
                <Message negative>{SERVER_ERR_MESSAGE}</Message>

            </Container>
        )
    }

    useEffect(() => {

        setMessage(<></>)

        if (props.error && props.error.response) {

            const response = props.error.response as AxiosResponse;

            switch (response.status) {
                case 400:
                    setMessage(getError400MessageComponent(response));
                    break;
                case 401:
                    setMessage(getError401MessageComponent());
                    break;
                case 500:
                    setMessage(getError500MessageComponent());
                    break;
                default:
                    break;
            }
        }
        else if (props.error && props.error.response === undefined) {
            setMessage(getError500MessageComponent());
        }

    }, [props.error])

    return (
        <>
            {props.error?.isAxiosError ? message : undefined}
        </>
    )
};

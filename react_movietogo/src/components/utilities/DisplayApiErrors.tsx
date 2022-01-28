import { AxiosError, AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Container, Message } from "semantic-ui-react";

interface ApiErrorsProps {
    error: AxiosError | undefined;
    response?: AxiosResponse | undefined;
    id?: number;
}

export default function DisplayApiErrors(props: ApiErrorsProps) {

    const [message, setMessage] = useState<ReactElement>(<></>);

    const getResponse204MessageComponent = (): ReactElement => {

        const NO_CONTENT_MESSAGE = 'No content';

        return (
            <Container textAlign="center" fluid>
                <Message warning>{NO_CONTENT_MESSAGE}</Message>
            </Container>
        )
    }

    const getError400MessageComponent = (response: AxiosResponse): ReactElement => {
        return (
            <Message negative>
                <ul>{response.data.map((error: any, index: number) => <li key={index}>{error}</li>)}</ul>
            </Message>
        )
    }

    const getError401MessageComponent = (response: AxiosResponse): ReactElement => {

        const UNAUTHORIZED_ERR_MESSAGE = response.data;

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

    const getGenericErrorMessageComponent = (response: AxiosResponse): ReactElement => {
        console.log("Error 500")
        return(
            <Container textAlign="center" fluid>
                <Message negative>{response.data}</Message>
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
                    setMessage(getError401MessageComponent(response));
                    break;
                case 500:
                    setMessage(getError500MessageComponent());
                    break;
                default:
                    setMessage(getGenericErrorMessageComponent(response));
                    break;
            }
        }
        else if(props.response)
        {
            switch ( props.response.status) {
                case 204:
                    setMessage(getResponse204MessageComponent());
                    break;
                default:
                    break;
            }
        }
        else if (props.error && props.error.response === undefined) {
            setMessage(getError500MessageComponent());
        }

    }, [props.error, props.response])

    return (
        <>
            {message}
        </>
    )
};

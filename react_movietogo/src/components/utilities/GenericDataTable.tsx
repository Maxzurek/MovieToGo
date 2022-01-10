import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Container, Label, Loader, Message, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import DisplayApiErrors from "./DisplayApiErrors";

interface DataTableProps {
    url: string;
    refresh: boolean;
    setRefresh(isRefresh: boolean): void;
    tableName: string;
    maxHeight?: string;
    color?: SemanticCOLORS;
}

GenericDataTable.defaultProps = {
    maxHeight: '100%',
    color: 'grey',
}

export default function GenericDataTable(props: DataTableProps) {

    const [response, setResponse] = useState<AxiosResponse<any>>();
    const [error, setError] = useState<AxiosError>();
    const [keys, setKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [labelColor, setLabelColor] = useState<SemanticCOLORS>('yellow');

    const LOADING_COLOR = 'yellow';
    const LOADED_COLOR = 'green';
    const ERROR_COLOR = 'red';
    const NO_DATA_COLOR = 'orange';

    async function getRequest() {
        try {
            const response = await axios.get(props.url);
            setResponse(response);
        } catch (error) {
            let axiosError = error as AxiosError;
            setError(axiosError);
        }
    }

    useEffect(() => { // Fetch data

        getRequest();

    }, [])

    useEffect(() => { // On refresh

        if (props.refresh) {
            console.log("refresh");
            props.setRefresh(false);
            setError(undefined);
            setLoading(true);
            getRequest();
        }

    }, [props.refresh])

    useEffect(() => { // Controls the loading state

        setKeys([]); // Reset keys or table headers will be duplicated

        if (response === undefined) // No response from the API
        {
            if (error?.isAxiosError) // We have an error from the API
            {
                setLoading(false);
                setLabelColor(ERROR_COLOR);
            }
            else // No error, still waiting for response
            {
                setLoading(true);
                setLabelColor(LOADING_COLOR);
            }
        }
        else // We have a response
        {
            if (response.data.length > 0) // We have data!
            {
                setLoading(false);
                setLabelColor(LOADED_COLOR);

                const dataSample = response.data[0];

                Object.entries(dataSample).map(([key, value]) => {
                    setKeys(prevArray => [...prevArray, key]);
                })
            }
            else if (!error?.isAxiosError)// No data found
            {
                setLoading(false);
                setLabelColor(NO_DATA_COLOR);
            }
        }
    }, [response, error])

    const renderTableRows = () => {

        return (
            response?.data.map((dataObject: any, index: number) => {
                return (
                    <TableRow key={index}>
                        {Object.entries(dataObject).map(([key, value]) => {

                            var stringValue = '';

                            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                                stringValue = value as string;
                            }
                            else if (Array.isArray(value)) {
                                stringValue = "[...]";
                            }
                            else if (value === null) {
                                stringValue = "NULL";
                            }
                            else if (typeof value === 'object') {
                                let values = Object.values(value);

                                if (values.length > 0) {
                                    stringValue = `{${values[0]}}`;
                                }
                            }

                            return (
                                <TableCell key={key}>{stringValue}</TableCell>
                            )
                        })}
                    </TableRow>
                )
            })
        )
    }

    const renderTable = () => {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        {keys.map((header, index) => <TableHeaderCell key={index} >{header}</TableHeaderCell>)}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {renderTableRows()}
                </TableBody>
            </Table>
        )
    }

    return (
        <Segment>
            <Container style={{ overflow: 'auto', maxHeight: props.maxHeight }}>
                <Loader active={loading} />
                <Segment inverted color={labelColor} textAlign="center" size="large">
                    {props.tableName}
                </Segment>
                {response?.data.length > 0 ? renderTable() : undefined}
                <DisplayApiErrors error={error!} />
                {response?.status === 204 ? <Message warning>Empty table</Message> : undefined}
            </Container>
        </Segment>
    )
};

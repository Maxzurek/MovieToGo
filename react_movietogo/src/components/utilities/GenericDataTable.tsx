import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Container, Loader, Message, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { object } from "yup/lib/locale";
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
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [labelColor, setLabelColor] = useState<SemanticCOLORS>('yellow');

    const LOADING_COLOR = 'yellow';
    const LOADED_COLOR = 'green';
    const ERROR_COLOR = 'red';
    const NO_DATA_COLOR = 'orange';

    useEffect(() => { // On component created and refresh or url changed
        const getRequest = async () => {
            try {
                const response = await axios.get(props.url);
                setResponse(response);

                if(Array.isArray(response.data)){
                    setData(response.data as []);
                }
                else{
                    setData(response.data.results);
                }

            } catch (error) {
                let axiosError = error as AxiosError;
                setResponse(undefined);
                setError(axiosError);
            }
        }

        if (props.refresh) {
            props.setRefresh(false);
            setError(undefined);
            setLoading(true);
            getRequest();
        }
        else{
            getRequest();
        }

    }, [props.refresh, props.url])

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
            if (data?.length > 0) // We have data!
            {
                setLoading(false);
                setLabelColor(LOADED_COLOR);

                const dataSample = data[0];

                Object.entries(dataSample).forEach(([key, value])=> {
                    setKeys(prevArray => [...prevArray, key]);         
                });
            }
            else if (!error?.isAxiosError)// No data found
            {
                setLoading(false);
                setLabelColor(NO_DATA_COLOR);
            }
        }
    }, [response, error, data])

    const renderTableRows = () => {

        return (
            data?.map((dataObject: any, index: number) => {
                return (
                    <TableRow key={index}>
                        {Object.entries(dataObject).map(([key, value]) => {

                            var stringValue = '';

                            if (value === null) {
                                stringValue = "NULL";
                            }
                            else if(typeof value === 'string'){
                                stringValue = value;
                            }
                            else if (typeof value === "number" || typeof value === "boolean") {
                                stringValue = value.toString();
                            }
                            else if (Array.isArray(value)) {
                                stringValue = "[";
                                stringValue += (value.length === 0 ? "empty" : value.toString());
                                stringValue += "]";
                            }
                            else if (typeof value === 'object') {
                                stringValue = JSON.stringify(value);         
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
            <Container style={{ overflow: 'auto', maxHeight:'10%' }}>
                <Loader active={loading} />
                <Segment inverted color={labelColor} textAlign="center" size="large">
                    {props.tableName}
                </Segment>
                {data?.length > 0 ? renderTable() : undefined}
                <DisplayApiErrors error={error!} />
                {response?.status === 204 ? <Message warning>Empty table</Message> : undefined}
            </Container>
        </Segment>
    )
};

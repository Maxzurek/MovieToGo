import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Container, Label, Loader, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import DisplayApiErrors from "./DisplayApiErrors";

interface DataTableProps {
    data: object[];
    apiErrors: AxiosError;
    maxHeight: string;
    color?: SemanticCOLORS;
    tableName?: string;
}

GenericDataTable.defaultProps = {
    maxHeight: '100%',
    color: 'grey',
    tableName: 'Table',
}

export default function GenericDataTable(props: DataTableProps) {

    const [tableHeaders, setTableHeaders] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [labelColor, setLabelColor] = useState<SemanticCOLORS>('yellow');

    const LOADING_COLOR = 'yellow';
    const LOADED_COLOR = 'green';
    const ERROR_COLOR = 'red';

    useEffect(() => {

        const dataLength = props.data.length;

        if (dataLength > 0) {
            setLoading(false);
            setLabelColor(LOADED_COLOR);

            var dataSample = props.data[0];

            Object.entries(dataSample).map(([key, value]) => {
                setTableHeaders(prevArray => [...prevArray, key])
            })
        }
        else if(!props.apiErrors.isAxiosError){
            setLoading(true);
            setLabelColor(LOADING_COLOR);
        }
        else{
            setLoading(false);
            setLabelColor(ERROR_COLOR);
        }

    }, [props.data, props.apiErrors])

    return (
        <Container style={{ overflow: 'auto', maxHeight: props.maxHeight }}>
            <Segment>
                <Loader active={loading} />
                <Label attached="top" color={labelColor}>{props.tableName}</Label>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tableHeaders.map((header, index) => <TableHeaderCell key={index} >{header}</TableHeaderCell>)}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {props.data.map((dataObject, index) => {
                            return (
                                <TableRow key={index}>
                                    {Object.entries(dataObject).map(([key, value]) => {
                                        return (
                                            <TableCell key={key}>{value}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <DisplayApiErrors error={props.apiErrors} />
            </Segment>
        </Container>
    )
};

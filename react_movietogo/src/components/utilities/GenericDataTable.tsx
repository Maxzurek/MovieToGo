import { useEffect, useState } from "react";
import { Container, Label, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

interface DataTableProps {
    data: object[];
    maxHeight: string;
    color?: SemanticCOLORS;
    tableName?: string;
}

DataTable.defaultProps = {
    maxHeight: '100%',
    color: 'grey',
    tableName: 'Table',
}

export default function DataTable(props: DataTableProps) {

    const [tableHeaders, setTableHeaders] = useState<string[]>([]);

    useEffect(() => {

        if (props.data.length > 0) {
            var dataSample = props.data[0];

            Object.entries(dataSample).map(([key, value]) => {
                setTableHeaders(prevArray => [...prevArray, key])
            })
        }

    }, [props.data])

    return (
        <Container style={{ overflow: 'auto', maxHeight: props.maxHeight }}>
            <Label>{props.tableName}</Label>
            <Table color={props.color}>
                <TableHeader>
                    <TableRow>
                        {tableHeaders.map((header, index) => <TableHeaderCell key={index} >{header}</TableHeaderCell>)}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {props.data.map((dataObject, index) => {
                        return(
                        <TableRow key={index}>
                            {Object.entries(dataObject).map(([key, value]) => {
                                return(
                                    <TableCell key={key}>{value}</TableCell>
                                )
                            })}
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Container>
    )
};

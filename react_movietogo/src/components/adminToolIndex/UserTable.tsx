import { Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { UserDTO } from "../../models/authentication.models";

interface UserTableProps {
    userDTOs: UserDTO[];
    makeAdmin(userDTO: UserDTO): void;
    removeAdmin(userDTO: UserDTO): void;
}

export default function UserTable(props: UserTableProps) {

    return (

        <Table size="large">
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Username</TableHeaderCell>
                    <TableHeaderCell textAlign="right">Actions</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.userDTOs.map((userDTO: UserDTO, index: number) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{userDTO.userName}</TableCell>
                            <TableCell textAlign="right">
                                <Button color="green" onClick={() => { props.makeAdmin(userDTO) }}>Make Admin</Button>
                                <Button color="red" onClick={() => { props.removeAdmin(userDTO) }}>Remove Admin</Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    )
};
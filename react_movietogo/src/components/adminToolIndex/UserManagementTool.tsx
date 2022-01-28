import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Header, Popup, Segment, SemanticCOLORS } from "semantic-ui-react";
import { movieToGoUrlUsers, movieToGoUrlUsersMakeAdmin, movieToGoUrlUsersRemoveAdmin } from "../../endpoints";
import { UserDTO } from "../../models/authentication.models";
import ModalContext from "../contexts/ModalContext";
import DisplayApiErrors from "../utilities/DisplayApiErrors";
import UserTable from "./UserTable";

interface UserManagementToolProps {

}

export default function UserManagementTool(props: UserManagementToolProps) {

    const { displayOkMessage } = useContext(ModalContext);

    const [refresh, setRefresh] = useState(false);
    const [userDTOs, setUserDTOs] = useState<UserDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [labelColor, setLabelColor] = useState<SemanticCOLORS>('yellow');
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();

    const fetchUsers = async () => {

        setLoading(true);
        setLabelColor("yellow");
        setError(undefined);

        await axios.get(movieToGoUrlUsers)
            .then((response: AxiosResponse<UserDTO[]>) => {
                setResponse(response);
                setUserDTOs(response.data);
                response.data.length > 0 ? setLabelColor('green') : setLabelColor('orange');;
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setLabelColor('red');
                setUserDTOs([]);
                setError(error);
            })
    }

    const makeAdmin = async (userDTO: UserDTO) => {

        setError(undefined);

        await axios.post(movieToGoUrlUsersMakeAdmin, userDTO)
            .then(response => {
                displayOkMessage(`User: ${userDTO.userName} is now successfully an Admin.`);
            })
            .catch(error => {
                setError(error);
            })
    }

    const removeAdmin = async (userDTO: UserDTO) => {

        setError(undefined);

        await axios.post(movieToGoUrlUsersRemoveAdmin, userDTO)
            .then(response => {
                displayOkMessage(`User: ${userDTO.userName} is no longer an Admin.`);
            })
            .catch(error => {
                setError(error);
            })
    }

    useEffect(() => {

        fetchUsers();

    }, [refresh])

    return (

        <Container fluid>
            <Segment color="blue" inverted>
                <Header textAlign="center" size="huge">
                    User Management Tool <Popup content='Refresh' trigger={<Button color="blue" icon='refresh' onClick={() => setRefresh(!refresh)} />} />
                </Header>
            </Segment>
            <Segment loading={loading}>
                <Segment color={labelColor} inverted textAlign="center">
                    <Header>Users</Header>
                </Segment>
                <UserTable userDTOs={userDTOs} makeAdmin={makeAdmin} removeAdmin={removeAdmin} />
                <DisplayApiErrors response={response} error={error} />
            </Segment>
        </Container>

    )
};
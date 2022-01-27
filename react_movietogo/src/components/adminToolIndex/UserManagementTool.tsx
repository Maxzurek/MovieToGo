import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Header, Popup, Segment } from "semantic-ui-react";
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
    const [error, setError] = useState<AxiosError>();

    const fetchUsers = async () => {

        console.log("Fetching data")
        setError(undefined);

        await axios.get(movieToGoUrlUsers)
            .then((response: AxiosResponse<UserDTO[]>) => {
                setUserDTOs(response.data)
            })
            .catch(error => {
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
            <UserTable userDTOs={userDTOs} makeAdmin={makeAdmin} removeAdmin={removeAdmin} />
            <DisplayApiErrors error={error!} />
        </Container>

    )
};

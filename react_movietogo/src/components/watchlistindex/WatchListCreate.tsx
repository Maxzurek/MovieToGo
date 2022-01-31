import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { Container, Form, FormInput, FormProps, Header, Segment, Button, Label } from "semantic-ui-react";
import { movieToGoUrlWatchLists } from "../../endpoints";
import { WatchListCreationDTO, WatchListDTO } from "../../models/watchlist.models";
import AppDataContext from "../contexts/AppDataContext";
import ModalContext from "../contexts/ModalContext";

interface WatchListCreateProps {
    setActiveItem: React.Dispatch<React.SetStateAction<number>>
}

export default function WatchListCreate(props: WatchListCreateProps) {

    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext)
    const [name, setName] = useState('');
    const { displayOkMessage } = useContext(ModalContext)

    async function createWatchList() {
        const watchListCreationDTO: WatchListCreationDTO = { name: name }

        await axios.post(movieToGoUrlWatchLists, watchListCreationDTO)
            .then((response: AxiosResponse<WatchListDTO>) => {

                let watchListDTO: WatchListDTO[] = []

                if (userWatchListDTO) {
                    watchListDTO = userWatchListDTO.slice()
                }

                watchListDTO.push(response.data)
                setUserWatchListDTO(watchListDTO)
                displayOkMessage("WatchList Created!")

                console.log(watchListDTO?.length)
                props.setActiveItem(watchListDTO?.length - 1)

            })
            .catch((error: AxiosError) => {
                console.log(error.response?.data);
            })
    }

    const handleItemClick = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        createWatchList();
    }

    return (
        <Container fluid>
            <Segment color="teal" inverted>
                <Header textAlign="center" size="huge">
                    Create a new Watchlist
                </Header>
            </Segment>
            <Form onSubmit={handleItemClick}>
                <label>Watchlist Name: </label>
                <FormInput type="text" name="name" value={name} onChange={(e, data) => setName(data.value)} />
                <Button inverted color="teal" type="submit">Create</Button>
            </Form>
        </Container>
    )
};
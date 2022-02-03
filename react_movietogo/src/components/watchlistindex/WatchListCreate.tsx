import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { Container, Form, FormProps, Header, Segment, Button, Input, FormField } from "semantic-ui-react";
import { movieToGoUrlWatchLists } from "../../endpoints";
import { WatchListCreationDTO, WatchListDTO } from "../../models/watchlist.models";
import AppDataContext from "../contexts/AppDataContext";

interface WatchListCreateProps {
    setActiveItem: React.Dispatch<React.SetStateAction<number>>
}

export default function WatchListCreate(props: WatchListCreateProps) {

    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext)
    const [name, setName] = useState('');

    async function createWatchList() {
        const watchListCreationDTO: WatchListCreationDTO = { name: name }

        await axios.post(movieToGoUrlWatchLists, watchListCreationDTO)
            .then((response: AxiosResponse<WatchListDTO>) => {

                let watchListDTOs: WatchListDTO[] = []

                if (userWatchListDTO) {
                    watchListDTOs = userWatchListDTO.slice()
                }

                watchListDTOs.push(response.data)
                setUserWatchListDTO(watchListDTOs)

                props.setActiveItem(watchListDTOs?.length - 1)
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
                <FormField
                    control={Input}
                    label={"Watchlist name:"}
                    value={name}
                    onChange={(e: any, data: any) => setName(data.value)}
                    autoComplete="off"
                >
                </FormField>
                <Button inverted color="teal" type="submit">Create</Button>
            </Form>
        </Container>
    )
};
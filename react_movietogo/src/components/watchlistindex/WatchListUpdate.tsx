import axios from "axios";
import { useContext, useState } from "react";
import { Button, Container, Form, FormInput, FormProps, Header, Segment } from "semantic-ui-react";
import { movieToGoUrlWatchLists, movieToGoUrlWatchListsUser } from "../../endpoints";
import { WatchListDTO, WatchListUpdateDTO } from "../../models/watchlist.models";
import AppDataContext from "../contexts/AppDataContext";
import ModalContext from "../contexts/ModalContext";

interface WatchListUpdateProps {
    setActiveItem: React.Dispatch<React.SetStateAction<number>>
}

export default function WatchListUpdate(props: WatchListUpdateProps) {

    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext)
    const [name, setName] = useState('');
    const { displayOkMessage } = useContext(ModalContext)
    const [activeItem, setActiveItem] = useState(0);
    
    


           
        
    
    async function updateWatchList() {
        const watchListUpdateDTO: WatchListUpdateDTO = { name: name }
        
        await axios.put(movieToGoUrlWatchLists + `?id=${setActiveItem}`, watchListUpdateDTO)
            .then(response =>{
                console.log(response.data)
            })

        displayOkMessage("WatchList Updated!")
    }

    const handleUpdateClick = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        
        updateWatchList();
    }

    



    return (
        <Container fluid>
            <Segment color="teal" inverted>
                <Header textAlign="center" size="huge">
                    Rename a WatchList
                </Header>
            </Segment>
            <Form onSubmit={handleUpdateClick}>
                <label>New Name: </label>
                <FormInput type="text" name="name" value={name} onChange={(e, data) => setName(data.value)} />
                <Button inverted color="teal" type="submit">Update</Button>
            </Form>
        </Container>
    )
}
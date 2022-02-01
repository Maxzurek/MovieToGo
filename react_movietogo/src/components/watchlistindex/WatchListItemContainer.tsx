import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Form, FormInput, FormProps, Grid, Header, Segment } from "semantic-ui-react";
import { movieToGoUrlWatchLists, movieToGoUrlWatchListsUser } from "../../endpoints";
import { WatchListDTO, WatchListUpdateDTO } from "../../models/watchlist.models";
import AppDataContext from "../contexts/AppDataContext";
import ModalContext from "../contexts/ModalContext";
import IndividualMovie from "../utilities/IndividualMovie";
import WatchListUpdate from "./WatchListUpdate";


interface WatchListItemContainerProps {
    watchListDTO: WatchListDTO
}

export default function WatchListItemContainer(props: WatchListItemContainerProps) {

    const { displayOkMessage } = useContext(ModalContext)
    const { userWatchListDTO, setUserWatchListDTO } = useContext(AppDataContext);
    const [isDeleted, setIsDeleted] = useState(false)
    const [activeItem, setActiveItem] = useState(0);


    const deleteWatchList = async () => {


        await axios.delete(movieToGoUrlWatchLists + `?id=${props.watchListDTO.id}`)
            .then(response => {

                let watchListDTO: WatchListDTO[] = []

                if (userWatchListDTO) {
                    watchListDTO = userWatchListDTO.slice()
                }
                setIsDeleted(true)
                setUserWatchListDTO(watchListDTO)
                displayOkMessage("WatchList Deleted!")
                console.log(watchListDTO.length)

            })
            .catch(error => console.log(error))


    }
    // const updateWatchList = async () => {
    //     const watchListUpdateDTO: WatchListUpdateDTO = { name: name }

    //     await axios.put(movieToGoUrlWatchLists, watchListUpdateDTO)
    //         .then((response: AxiosResponse<WatchListDTO>) => {
                
    //             setName(name)

    //             watchListUpdateDTO.name = name
                

                

                
    //             displayOkMessage("WatchList Updated!")

                


    //         })
    //         .catch((error: AxiosError) => {
    //             console.log(error.response?.data);
    //         })
    // }

    const handleItemClickDelete = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        deleteWatchList();
    }
    // const handleItemClickupdate = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    //     updateWatchList();
    // }

    const headerSegment = () => {
        return (
            <> <Segment color="blue" inverted fluid textAlign="center"><Header as='h1'>{props.watchListDTO.name}</Header></Segment>
                <Container textAlign="right" fluid>
                    <Dropdown icon="ellipsis horizontal" >
                        <Dropdown.Menu direction="left">
                            <Form onSubmit={handleItemClickDelete}>


                                <Button fluid color="red" type="submit">Delete</Button>
                                
                            </Form>
                            <Button fluid color="blue" type="submit">Update</Button>
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                <Grid centered stackable>
                    {props?.watchListDTO?.watchListItems?.map((watchListItemDTO, index) => {
                        return (
                            <IndividualMovie
                                theMovieDbDTO={watchListItemDTO.theMovieDbDTO!}
                                movieToGoDTO={watchListItemDTO.movie!}
                                itemId={index.toString()}
                                isInWatchList
                                watchListItemID={watchListItemDTO.id}
                                key={index}
                                watchListId={props.watchListDTO.id}
                            />
                        )
                    })}</Grid>

            </>
        )
    }
    useEffect(() => {
        if (isDeleted) {

            setUserWatchListDTO(userWatchListDTO)

        }
        console.log(userWatchListDTO?.length)

    }, [userWatchListDTO])
    return (
        <Container fluid >

            {props.watchListDTO && props.watchListDTO.watchListItems && props.watchListDTO.watchListItems.length > 0 ?

                headerSegment()

                : <><Segment color="red" inverted fluid textAlign="center"><Header as='h1'>This watchlist is empty ...</Header></Segment><Container textAlign="right" fluid>
                    <Dropdown icon="ellipsis horizontal" >
                        <Dropdown.Menu direction="left">
                            <Button fluid onClick={deleteWatchList} color="red">Delete</Button>
                            <Button fluid color="blue" type="submit">Update</Button>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container></>
            }


        </Container>

    );
};        
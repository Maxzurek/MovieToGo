import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Item, List, ListItem } from "semantic-ui-react";
import { theMovieDbGenres } from "../../endpoints";
import { GenresDTO, TheMovieDbDTO } from "../../models/movie.models";
import AppDataContext from "../contexts/AppDataContext";


interface listItemsProps {
    genresIDs: any[] | undefined

}

export default function ListItems(props: listItemsProps) {

    const {genresDTO } = useContext(AppDataContext);
    const [genresName, setGenresName] = useState<string[]>([])

    useEffect(() => {
        if (props.genresIDs) {

            let genresName: string[] = [];

            let genresIDS: number[] = [];

            genresDTO.map((genre: GenresDTO) => {

                if (props.genresIDs) {

                    genresIDS = props.genresIDs;

                    if (genresIDS.find((x) => x === genre.id)) {

                        genresName.push(genre.name)
                    }
                }
            })
            setGenresName(genresName)
            console.log()
        }
    }, [genresDTO])

    return (
        <div>
            {genresName.map((item, index) => (
                <List.Item key={index} > {item}</List.Item>
            ))}
        </div>
    )



}
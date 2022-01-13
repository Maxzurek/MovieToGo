import axios from "axios"
import { useState } from "react"
import { Button, FormInput, Icon, Image, Input, InputOnChangeData, Segment } from "semantic-ui-react";
import { theMovieDbImages, theMovieDbSearchByKeyword } from "../../endpoints"
import GenericDataTable from "../utilities/GenericDataTable";

interface JeremyIndexProps {
}

interface TheMovieDbDTO {
    title: string;
    release_date: string;
    poster_path: string;
}

export default function JeremyIndex(props: JeremyIndexProps) {

    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<TheMovieDbDTO[]>([]);

    const appelAPI = async () => {
        let response = await axios.get(theMovieDbSearchByKeyword + keyword)
        setResults(response.data.results);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setKeyword(data.value);
        appelAPI();
    }

    return (
        <>
            <h3>Page jeremy</h3>
            <Input onChange={onChange}></Input>
            <Segment>
                <ul>
                    {results?.map((movie, index) => {
                        console.log(movie);
                        return (
                            <>
                                <Image size="tiny" src={theMovieDbImages + movie.poster_path} />
                                <li key={index}>{movie.title} : {movie.release_date}</li>
                            </>
                        )
                    })}
                </ul>
            </Segment>
            <br />
            <br />
            <br />
            <GenericDataTable url={theMovieDbSearchByKeyword + keyword} tableName="example" />
        </>
    )
};

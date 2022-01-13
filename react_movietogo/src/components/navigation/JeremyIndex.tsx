import { useState } from "react";
import { Grid, Search, SearchProps, Label, SearchResultProps, SearchResultData } from "semantic-ui-react";
import { movieToGoUrlMovies, theMovieDbImages, theMovieDbSearchByKeyword } from "../../endpoints";
import axios, { AxiosError } from 'axios';
import React from "react";
import { number } from "yup/lib/locale";
import { MovieCreationDTO } from "../../models/movie.models";



interface JeremyIndexProps {

}
interface theMovieDbDTO {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function JeremyIndex(props: JeremyIndexProps) {


  const [error, setError] = useState<AxiosError>();
  const [keyword, setKeyword] = useState<string | undefined>();
  const [results, setResults] = useState<theMovieDbDTO[]>([]);

  const getTheMovieDbData = async () => {
    try {
      let response = await axios.get(theMovieDbSearchByKeyword + keyword);
      setError(undefined);
      setResults([]);
      var results = response.data.results;
      console.log(results);

      results.map((result: any) => {
        let theMovieDTO: theMovieDbDTO = {
          id: "",
          title: "",
          description: "",
          image: ""
        }
        createMovieToGoMovie(result.id);
        theMovieDTO.id = result.id;
        theMovieDTO.title = result.title;
        theMovieDTO.description = result.release_date;
        theMovieDTO.image = theMovieDbImages + result.poster_path;
        setResults((oldResult) => [...oldResult, theMovieDTO])
      })



    }

    catch (error) {
      let axiosError = error as AxiosError;
      setError(axiosError);

    }

  }
  const onChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
    console.log(data.value);
    setKeyword(data.value);

    getTheMovieDbData();
  }
  const createMovieToGoMovie = async (id : number) => {
    let movieCreationDTO: MovieCreationDTO = {TheMovieDbId: id}
    try {
      let response = await axios.post(movieToGoUrlMovies,movieCreationDTO);
      
    } 
    catch (error) {
      let axiosError = error as AxiosError;
      setError(axiosError);
    }

  }


    const onResultSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: SearchResultData) => {


    }

    const renderResult = (props: SearchResultProps) => { return (<Label>{props.title}</Label>) }


    return (
      <Grid>
        <Grid.Column width={6}>

          <Search
            onSearchChange={onChange}
            //resultRenderer={renderResult}
            results={results}
            //onResultSelect=






          />
        </Grid.Column>


      </Grid>




    );
  }

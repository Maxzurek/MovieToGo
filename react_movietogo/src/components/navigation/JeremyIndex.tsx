import { useState } from "react";
import { Grid, Search, SearchProps, Label, SearchResultProps, SearchResultData, Input } from "semantic-ui-react";
import { movieToGoUrlMovies, theMovieDbImages, theMovieDbSearchByKeyword } from "../../endpoints";
import axios, { AxiosError } from 'axios';
import React from "react";
import { number } from "yup/lib/locale";
import { MovieCreationDTO } from "../../models/movie.models";



interface JeremyIndexProps {

}
interface MovieResult {
  movieToGoId: string;
  theMovieDbId: string;
  title: string;
  description: string;
  image: string;
}

export default function JeremyIndex(props: JeremyIndexProps) {


  const [error, setError] = useState<AxiosError>();
  const [keyword, setKeyword] = useState<string | undefined>();
  const [results, setResults] = useState<MovieResult[]>([]);

  const getTheMovieDbData = async () => {
    try {
      let response = await axios.get(theMovieDbSearchByKeyword + keyword);
      setError(undefined);
      setResults([]);
      var results = response.data.results;
      //console.log(results);

      results.map(async (result: any) => {

        let movieResult: MovieResult = {
          movieToGoId:"",
          theMovieDbId:"",
          title: "",
          description: "",
          image: ""
        }

        let movieToGoDTO = await createMovieToGoMovie(result.id) ;

        movieResult.movieToGoId = movieToGoDTO.id;
        movieResult.theMovieDbId = result.id;
        movieResult.title = result.title;
        movieResult.description = result.release_date;
        movieResult.image = theMovieDbImages + result.poster_path;
        setResults((oldResult) => [...oldResult, movieResult])
       // console.log(movieResult);
      })



    }

    catch (error) {
      let axiosError = error as AxiosError;
      setError(axiosError);

    }

  }
  const onChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
   // console.log(data.value);
    setKeyword(data.value);

    getTheMovieDbData();
  }
  const createMovieToGoMovie = async (id : number) => {
    let movieCreationDTO: MovieCreationDTO = {TheMovieDbId: id}
    try {
      let response = await axios.post(movieToGoUrlMovies,movieCreationDTO);
      return response.data;
    } 
    catch (error) {
      let axiosError = error as AxiosError;
      setError(axiosError);
    }

  }


    const onResultSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: SearchResultData) => {
        console.log(data.result)

    }



    return (
      <Grid>
        <Grid.Column width={5}>

          <Search
            fluid
            onSearchChange={onChange}
            results={results}
            size = "huge"
            input = {<Input fluid/>}
            onResultSelect={onResultSelect}






          />
        </Grid.Column>


      </Grid>




    );
  }

import { Component, useEffect, useState } from "react";
import { Grid, Search, Segment, Header, InputOnChangeData, GridColumn, SearchProps, Label, SearchResultProps } from "semantic-ui-react";
import { movieToGoUrlAccounts, theMovieDbSearchByKeyword } from "../../endpoints";
import GenericDataTable from "../utilities/GenericDataTable";
import axios, { AxiosError } from 'axios';
import { url } from "inspector";
import { render } from "@testing-library/react";
import React from "react";



interface JeremyIndexProps {

}
interface theMovieDbDTO {
  title: string;
  description: string;
  image: string;
}

export default function JeremyIndex(props: JeremyIndexProps) {


  const [error, setError] = useState<AxiosError>();
  const [keyword, setKeyword] = useState<string | undefined>();
  const [results, setResults] = useState<theMovieDbDTO[]>([]);

  const getMovieData = async () => {
    try {
      let response = await axios.get(theMovieDbSearchByKeyword + keyword);
      setError(undefined);
      setResults([]);
      var results = response.data.results;
      var theMovieDTO: theMovieDbDTO = {
        title: "",
        description: "",
        image: ""
      }
      results.map((result: any) => {
        theMovieDTO.title = result.title;
        theMovieDTO.description = result.release_date;
        theMovieDTO.image = result.poster;
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

    getMovieData();
  }

  const renderResult = (props: SearchResultProps) => { return (<Label>{props.title}</Label>) }


  return (
    <Grid>
      <Grid.Column width={6}>

        <Search
          onSearchChange={onChange}
          resultRenderer={renderResult}
          results={results}







        />
      </Grid.Column>


    </Grid>




  );
}


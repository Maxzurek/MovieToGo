import { Link, useLocation } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { MovieDetailsData } from "../../models/movie.models";

interface StateType {
    movieDetailsData: MovieDetailsData 
}

interface MovieIndexProps {
    
}

export default function MovieIndex(props: MovieIndexProps) {

    const location = useLocation();
    const state = location.state as StateType;

    return (
        <Container fluid textAlign="center">
            <Header as='h1'>Movie Details</Header>
            <Header as='h1'>Title: {state.movieDetailsData.theMovieDbData?.title}</Header>
            <Header as='h1'>IDdb: {state.movieDetailsData.theMovieDbData?.id}</Header>
            <Header as='h1'>ID: {state.movieDetailsData.movieToGoData?.id}</Header>
            <Link to='/movie' state={state.movieDetailsData.movieToGoData}></Link>
        </Container>
    )
};

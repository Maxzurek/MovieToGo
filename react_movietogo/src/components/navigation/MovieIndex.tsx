import { Link, useLocation } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { NavigationContextState } from "../../models/movie.models";

interface StateType {
    movieDetailsData: NavigationContextState 
}

interface MovieIndexProps {
    
}

export default function MovieIndex(props: MovieIndexProps) {

    const location = useLocation();
    const state = location.state as StateType;

    return (
        <Container fluid textAlign="center">
            <Header as='h1'>Movie Details</Header>
            <Header as='h1'>Title: {state.movieDetailsData.theMovieDbDTO?.title}</Header>
            <Header as='h1'>IDdb: {state.movieDetailsData.theMovieDbDTO?.id}</Header>
            <Header as='h1'>ID: {state.movieDetailsData.movieToGoDTO?.id}</Header>
            <Link to='/movie' state={state.movieDetailsData.movieToGoDTO}></Link>
        </Container>
    )
};

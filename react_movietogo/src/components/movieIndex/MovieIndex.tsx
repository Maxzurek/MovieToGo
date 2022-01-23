import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { MovieToGoDTO, NavigationContextState, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";

import HeaderImg from "./HeaderImg";
import MovieNavbar from "./MovieNavbar";

interface StateType {
    movieDetailsData: NavigationContextState
}


export default function MovieIndex() {

    const location = useLocation();
    const state = location.state as StateType;

    return (
        <>
            <HeaderImg
                title={state.movieDetailsData.theMovieDbDTO?.title}
                overview={state.movieDetailsData.theMovieDbDTO?.overview}
                image={state.movieDetailsData.theMovieDbDTO?.backdrop_path}
                posterImg={state.movieDetailsData.theMovieDbDTO?.poster_path} />
            <MovieNavbar  theMovieDbDTO={state.movieDetailsData.theMovieDbDTO}
                          movieToGoDTO={state.movieDetailsData.movieToGoDTO}
              />
        </>
    )
};

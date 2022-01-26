import { useContext } from "react";
import AppDataContext from "../contexts/AppDataContext";

import HeaderImg from "./HeaderImg";
import MovieNavbar from "./MovieNavbar";

export default function MovieIndex() {

    const { userWatchListDTO, navigationDTO } = useContext(AppDataContext)

    return (
        <>
            <HeaderImg
                title={navigationDTO?.theMovieDbDTO?.title}
                overview={navigationDTO?.theMovieDbDTO?.overview}
                image={navigationDTO?.theMovieDbDTO?.backdrop_path}
                posterImg={navigationDTO?.theMovieDbDTO?.poster_path} />
            <MovieNavbar theMovieDbDTO={navigationDTO?.theMovieDbDTO}
                movieToGoDTO={navigationDTO?.movieToGoDTO}
                watchListDTO={userWatchListDTO}
            />
        </>
    )
};

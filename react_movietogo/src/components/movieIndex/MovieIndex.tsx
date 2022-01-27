import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { movieToGoUrlMovies, movieToGoUrlMovieVotesByMovieId, theMovieDbApiKey, theMovieDbMovie } from "../../endpoints";
import { MovieToGoDTO, TheMovieDbDetailsDTO, TheMovieDbDTO } from "../../models/movie.models";
import { getClaims } from "../authentication/handleJWT";
import AppDataContext from "../contexts/AppDataContext";

import HeaderImg from "./HeaderImg";
import MovieNavbar from "./MovieNavbar";

interface StateType {
    theMovieDbId: number;
    movieToGoId: number;
}

export default function MovieIndex() {

    const { userWatchListDTO } = useContext(AppDataContext)
    const { state } = useLocation();
    const { theMovieDbId, movieToGoId } = state as StateType;

    const [theMovieDbDTO, setTheMovieDbDTO] = useState<TheMovieDbDetailsDTO>();
    const [movieToGoDTO, setMovieToGoDTO] = useState<MovieToGoDTO>();
    const [isLoadingData, setLoadingData] = useState(true);

    useEffect(() => {

        fetchData();
    }, [theMovieDbId, movieToGoId])

    const fetchData = async () => {

        setLoadingData(true)

        const requestOne = axios.get(`${theMovieDbMovie}/${theMovieDbId}?api_key=${theMovieDbApiKey}&language=en-US`)
        const requestTwo = axios.get(movieToGoUrlMovies + `/${movieToGoId}`)

        try {
            await axios.all([requestOne, requestTwo])
                .then(axios.spread(async (...responses) => {

                    let theMovieDbDTO = responses[0].data
                    let movieToGoDTO = responses[1].data

                    if (getClaims().length > 0) {
                        await axios.get(movieToGoUrlMovieVotesByMovieId + `/${movieToGoDTO.id}`)
                            .then((response) => {

                                let movieVoteDTO = response.data;

                                if (movieVoteDTO === "") {
                                    movieVoteDTO = undefined;
                                }

                                movieToGoDTO.movieVote = movieVoteDTO;

                            })
                    }
                    
                    setTheMovieDbDTO(theMovieDbDTO)
                    setMovieToGoDTO(movieToGoDTO)
                    setLoadingData(false)
                }))
        } catch (error) {
            // Todo Do something with error
            setLoadingData(false)
        }
    }

    const renderComponents = () => {
        return (
            <>
                <HeaderImg
                    title={theMovieDbDTO?.title}
                    overview={theMovieDbDTO?.overview}
                    image={theMovieDbDTO?.backdrop_path}
                    posterImg={theMovieDbDTO?.poster_path} />
                <MovieNavbar
                    theMovieDbDTO={theMovieDbDTO}
                    movieToGoDTO={movieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />
            </>
        )
    }

    return (
        isLoadingData ? <></> : renderComponents()
    )
};

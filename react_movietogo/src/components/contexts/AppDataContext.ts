import React from "react";
import { GenresDTO, NavigationMovieDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";

const AppDataContext = React.createContext<{

    genresDTO: GenresDTO[];
    setGenresDTO(genreDTO: GenresDTO[]): void;

    userWatchListDTO: WatchListDTO[] | undefined;
    setUserWatchListDTO(userWatchListDTO: WatchListDTO[] | undefined): void;

    navigationDTO: NavigationMovieDTO | undefined;
    setNavigationDTO(navigationDTO: NavigationMovieDTO) : void;
    
}>({
    genresDTO: [],
    setGenresDTO: () => { },

    userWatchListDTO: undefined,
    setUserWatchListDTO: () => { },

    navigationDTO: undefined,
    setNavigationDTO: ()=>{},
});

export default AppDataContext;
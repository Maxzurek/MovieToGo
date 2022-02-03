import React from "react";
import { GenresDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";

const AppDataContext = React.createContext<{

    genresDTO: GenresDTO[];
    setGenresDTO(genreDTO: GenresDTO[]): void;

    userWatchListDTO: WatchListDTO[] | undefined;
    setUserWatchListDTO(userWatchListDTO: WatchListDTO[] | undefined): void;
}>({
    genresDTO: [],
    setGenresDTO: () => { },

    userWatchListDTO: undefined,
    setUserWatchListDTO: () => { },
});

export default AppDataContext;
import React from "react";
import { GenresDTO, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";

const AppDataContext = React.createContext<{

    genresDTO: GenresDTO[];
    setGenresDTO(genreDTO: GenresDTO[]): void;

    trendingTheMovieDbDTO: TheMovieDbDTO[];
    setTrendingTheMovieDbDTO(trendingTheMovieDbDTO: TheMovieDbDTO[]): void;
    trendingMovieToGoDTO: MovieToGoDTO[];
    setTrendingMovieToGoDTO(trendingMovieToGoDTO: MovieToGoDTO[]): void;

    popularTheMovieDbDTO: TheMovieDbDTO[];
    setPopularTheMovieDbDTO(popularTheMovieDbDTO: TheMovieDbDTO[]): void;
    popularMovieToGoDTO: MovieToGoDTO[];
    setPopularMovieToGoDTO(popularMovieToGoDTO: MovieToGoDTO[]): void;

    inTheatersTheMovieDbDTO: TheMovieDbDTO[];
    setInTheatersTheMovieDbDTO(inTheatersTheMovieDbDTO: TheMovieDbDTO[]): void;
    inTheatersMovieToGoDTO: MovieToGoDTO[];
    setInTheatersMovieToGoDTO(inTheatersMovieToGoDTO: MovieToGoDTO[]): void;

    userWatchListDTO: WatchListDTO[] | undefined;
    setUserWatchListDTO(userWatchListDTO: WatchListDTO[] | undefined): void;

    isLoadingData: boolean;
    setLoadingData(isLoadingData: boolean): void;

}>({
    genresDTO: [],
    setGenresDTO: () => { },

    trendingTheMovieDbDTO: [],
    setTrendingTheMovieDbDTO: () => { },
    trendingMovieToGoDTO: [],
    setTrendingMovieToGoDTO: () => { },

    popularTheMovieDbDTO: [],
    setPopularTheMovieDbDTO: () => { },
    popularMovieToGoDTO: [],
    setPopularMovieToGoDTO: () => { },

    inTheatersTheMovieDbDTO: [],
    setInTheatersTheMovieDbDTO: () => { },
    inTheatersMovieToGoDTO: [],
    setInTheatersMovieToGoDTO: () => { },

    userWatchListDTO: undefined,
    setUserWatchListDTO: () => { },

    isLoadingData: true,
    setLoadingData: () => { }
});

export default AppDataContext;
import { UserDTO } from "./authentication.models";

// WatchList
export interface WatchListDTO{
    id: int;
    name: string;
    user: UserDTO | undefined;
    watchListItems: WatchListItemDTO[] | undefined;
}
export interface WatchListCreationDTO{
    name: string;
}
export interface WatchListUpdateDTO{
    name: string;
}

// WatchListItem
export interface WatchListItemDTO{
    id: number;
    watched: boolean;
    movie: MovieDTO;
}
export interface WatchListItemCreationDTO{
    watchListID: number;
    movieId: number;
}
export interface WatchListItemUpdateDTO{
    watched: boolean;  
}
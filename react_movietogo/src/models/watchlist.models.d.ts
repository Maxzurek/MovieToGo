import { UserDTO } from "./authentication.models";

// WatchList
export interface WatchListDTO{
    Id: int;
    Name: string;
    User: UserDTO;
    WatchListItems: WatchListItemDTO[];
}
export interface WatchListCreationDTO{
    Name: string;
}
export interface WatchListUpdateDTO{
    Name: string;
}

// WatchListItem
export interface WatchListItemDTO{
    Id: number;
    Watched: boolean;
    Movie: MovieDTO;
}
export interface WatchListItemCreationDTO{
    WatchListID: number;
    MovieId: number;
}
export interface WatchListItemUpdateDTO{
    Watched: boolean;  
}
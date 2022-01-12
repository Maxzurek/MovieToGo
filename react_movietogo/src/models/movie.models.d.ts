import { UserDTO } from "./authentication.models";

// Movies 
export interface MovieDTO{
    Id: number;
    TheMovieDbId: number;
    VoteAverage: number;
    VoteCount: number;
    MovieReviews: MovieReviewDTO;
}
export interface MovieCreationDTO{
    TheMovieDbId: number;
}
export interface MovieUpdateDTO{
    TheMovieDbId: number;
    VoteAverage: number;
    VoteCount: number;
}

// MovieVotes
export interface MovieVoteDTO{
    Id: number;
    Vote: number;
    User: UserDTO;
    MovieId: number;
}
export interface MovieVoteCreationDTO{
    vote: number;
    movieId: number;
}
export interface MovieVoteUpdateDTO{
    vote: number;
}

// MovieReviews
export interface MovieReviewDTO{
    Id: number;
    body: string;
    DateCreated: Date;
    MovieId: number;
    user: UserDTO;
}
export interface MovieReviewCreationDTO{
    body: string;
    DateCreated: Date;
    MovieId: number;
}
export interface MovieReviewCreationDTO{
    body: string;
}

//Movie Cards
export interface movieCardDTO{
    id : number;
    title : string;
    release_date : Date
    vote_average:number
    poster_path:string
}
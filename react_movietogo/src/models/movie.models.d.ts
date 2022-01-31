import { UserDTO } from "./authentication.models";
import { WatchListDTO } from "./watchlist.models";

// TheMovieDb Movie
export interface TheMovieDbDTO {
    adult: string;
    backdrop_path: string;
    genre_ids: [];
    original_language: string;
    original_title: string;
    poster_path: string;
    vote_count: number;
    video: boolean;
    vote_average: number;
    title: string;
    overview: string;
    id: number;
    release_date: string;
    popularity: number;
    media_type: string;
}

export interface TheMovieDbDetailsDTO {
    adult: string;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number;
    genres: [];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [];
    status: string;
    tagline: string;
    title: string;
    video: bool;
    vote_average: number;
    vote_count: number;
}

// MovieToGo Movies 
export interface MovieToGoDTO {
    id: number;
    theMovieDbId: number;
    voteAverage: number;
    voteCount: number;
    movieReviews: MovieReviewDTO[] | undefined;
    movieVote: MovieVoteDTO | undefined;
}
export interface MovieCreationDTO {
    theMovieDbId: number;
}
export interface MovieUpdateDTO {
    theMovieDbId: number;
    voteAverage: number;
    voteCount: number;
}

// MovieVotes
export interface MovieVoteDTO {
    id: number;
    vote: number;
    user: UserDTO | undefined;
    movieId: number | undefined;
}
export interface MovieVoteCreationDTO {
    vote: number;
    movieId: number;
}
export interface MovieVoteUpdateDTO {
    vote: number;
}

// MovieReviews
export interface MovieReviewDTO {
    id: number;
    body: string;
    dateCreated: Date;
    movieId: number;
    user: UserDTO;
}
export interface MovieReviewCreationDTO {
    body: string;
    dateCreated: date;
    movieId: number;
}
export interface MovieReviewCreationDTO {
    body: string;
}

export interface NavigationMovieDTO {
    theMovieDbDTO: TheMovieDbDTO | undefined;
    movieToGoDTO: MovieToGoDTO | undefined;
    // watchListDTO: WatchListDTO[] | undefined;
}

//Movie GenresDTO
export interface GenresDTO {
    id: number;
    name: string;

}
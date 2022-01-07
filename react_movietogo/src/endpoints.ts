// Base MovieToGo URL => https://localhost:7246/api
const movieToGoBaseUrl = process.env.REACT_APP_MOVIETOGO_API_URL;
// Base TheMovieDb URL => https://api.themoviedb.org/3
const theMovieDbBaseUrl = process.env.REACT_APP_THEMOVIEDB_API_URL;
// TheMovieDb API Key
const theMovieDbApiKey = process.env.REACT_APP_THEMOVIEDB_API_KEY;


// MovieToGo endpoints

    // Genres
    export const movieToGoUrlGenres = `${movieToGoBaseUrl}/genres`;

    // Accounts
    export const movieToGoUrlAccountsCreate = `${movieToGoBaseUrl}/accounts/create`;
    export const movieToGoUrlAccountsLogin = `${movieToGoBaseUrl}/accounts/login`;
    export const movieToGoUrlAccounts = `${movieToGoBaseUrl}/accounts`;

    // Movies
    export const movieToGoUrlMovies = `${movieToGoBaseUrl}/movies`;
    export const movieToGoUrlGetMovieByTheMovieDbId = `${movieToGoBaseUrl}/movies/themoviedb`;

    // MovieReviews
    export const movieToGoUrlMovieReviews = `${movieToGoBaseUrl}/movieReviews`;
    export const movieToGoUrlGetMovieReviewsByMovieId = `${movieToGoBaseUrl}/movieReviews/movie`;

    // MovieVotes
    export const movieToGoUrlMovieVotes = `${movieToGoBaseUrl}/movieVotes`;

    // WatchListItems
    export const movieToGoUrlWatchListItems = `${movieToGoBaseUrl}/watchListItems`;
    export const movieToGoUrlGetWatchListItemsByWatchListId = `${movieToGoBaseUrl}/watchListItems/watchList`;

    // WatchLists
    export const movieToGoUrlWatchLists = `${movieToGoBaseUrl}/watchLists`;

// TheMovieDb endpoints

    // Genres
    export const theMovieDbGenres = `${theMovieDbBaseUrl}/genre/movie/list?api_key=${theMovieDbApiKey}`

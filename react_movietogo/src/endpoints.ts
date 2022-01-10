// Base MovieToGo URL => https://localhost:7246/api
const movieToGoBaseUrl = process.env.REACT_APP_MOVIETOGO_API_URL;
// Base TheMovieDb URL => https://api.themoviedb.org/3
const theMovieDbBaseUrl = process.env.REACT_APP_THEMOVIEDB_API_URL;
// TheMovieDb API Key
const theMovieDbApiKey = process.env.REACT_APP_THEMOVIEDB_API_KEY;


// MovieToGo endpoints

    // Genres
    export const movieToGoUrlGenres = `${movieToGoBaseUrl}/genres`;

    // Users
    export const movieToGoUrlAccounts = `${movieToGoBaseUrl}/users`;
    export const movieToGoUrlAccountsCreate = `${movieToGoBaseUrl}/users/create`;
    export const movieToGoUrlAccountsLogin = `${movieToGoBaseUrl}/users/login`;

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

    // Movies search
    export const theMovieDbMoviesSearch = `${theMovieDbBaseUrl}/search/movie/?api_key=${theMovieDbApiKey}&language=en-US&query=`

    // Genres
    export const theMovieDbGenres = `${theMovieDbBaseUrl}/genre/movie/list?api_key=${theMovieDbApiKey}`

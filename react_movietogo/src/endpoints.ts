// Base MovieToGo URL => https://localhost:7246/api
export const movieToGoBaseUrl = process.env.REACT_APP_MOVIETOGO_API_URL;
// Base TheMovieDb URL => https://api.themoviedb.org/3
export const theMovieDbBaseUrl = process.env.REACT_APP_THEMOVIEDB_API_URL;
// TheMovieDb API Key
export const theMovieDbApiKey = process.env.REACT_APP_THEMOVIEDB_API_KEY;


// MovieToGo endpoints

    // Users
    export const movieToGoUrlUsers = `${movieToGoBaseUrl}/users`;
    export const movieToGoUrlUsersMakeAdmin = `${movieToGoBaseUrl}/users/makeAdmin`;
    export const movieToGoUrlUsersRemoveAdmin = `${movieToGoBaseUrl}/users/removeAdmin`;

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
    export const movieToGoUrlMovieVotesByMovieId = `${movieToGoBaseUrl}/movieVotes/movie`;

    // WatchListItems
    export const movieToGoUrlWatchListItems = `${movieToGoBaseUrl}/watchListItems`;
    export const movieToGoUrlGetWatchListItemsByWatchListId = `${movieToGoBaseUrl}/watchListItems/watchList`;

    // WatchLists
    export const movieToGoUrlWatchLists = `${movieToGoBaseUrl}/watchLists`;
    export const movieToGoUrlWatchListsUser = `${movieToGoBaseUrl}/watchLists/user`;

// TheMovieDb endpoints

    // Movies search
    export const theMovieDbSearchByKeyword = `${theMovieDbBaseUrl}/search/movie/?api_key=${theMovieDbApiKey}&language=en-US&query=`;

    // Movies Trending
        // Daily
    export const theMovieDbTrendingDaily = `${theMovieDbBaseUrl}/trending/movie/day?api_key=${theMovieDbApiKey}`;
        // Weekly
    export const theMovieDbTrendingWeekly = `${theMovieDbBaseUrl}/trending/movie/week?api_key=${theMovieDbApiKey}`;

    // Movies Popular
    export const theMovieDbPopulars = `${theMovieDbBaseUrl}/discover/movie?api_key=${theMovieDbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`;

    // Movies In theater
    export const theMovieDbInTheater = `${theMovieDbBaseUrl}/movie/now_playing?api_key=${theMovieDbApiKey}&language=en-US&page=1&region=us`;

    // Genres
    export const theMovieDbGenres = `${theMovieDbBaseUrl}/genre/movie/list?api_key=${theMovieDbApiKey}`;

    // Images
    export const theMovieDbImages = `https://image.tmdb.org/t/p/original`;

    // Movie
    export const theMovieDbMovie = `${theMovieDbBaseUrl}/movie`;;

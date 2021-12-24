const movieToGoBaseUrl = process.env.REACT_APP_MOVIETOGO_API_URL;

export const movieToGoUrlGenres = `${movieToGoBaseUrl}/genres`;


const theMovieDbBaseUrl = process.env.REACT_APP_THEMOVIEDB_API_URL;
const theMovieDbApiKey = process.env.REACT_APP_THEMOVIEDB_API_KEY;

export const theMovieDbGenres = `${theMovieDbBaseUrl}/genre/movie/list?api_key=${theMovieDbApiKey}`

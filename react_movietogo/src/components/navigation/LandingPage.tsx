import axios, { AxiosError } from "axios";
import { useEffect,} from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStateIfMounted } from "use-state-if-mounted";

import { movieToGoUrlMovies, movieToGoUrlMovieVotesByMovieId, movieToGoUrlWatchListsUser, theMovieDbInTheater, theMovieDbPopulars, theMovieDbTrendingDaily } from "../../endpoints";
import { MovieCreationDTO, MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models";
import { WatchListDTO } from "../../models/watchlist.models";
import MovieCards from "../utilities/MovieCards";



export default function LandingPage() {

    const [tredingMovies, setTredingMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [tredingmovieToGoDTO, setTredingmovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [popularMovies, setPopularMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [popularmovieToGoDTO, setPopularmovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [theaterMovies, setTheaterMovies] = useStateIfMounted<TheMovieDbDTO[]>([]);
    const [theatermovieToGoDTO, setTheatermovieToGoDTO] = useStateIfMounted<MovieToGoDTO[]>([]);
    const [watchListDTO, setWatchListDTO] = useStateIfMounted<WatchListDTO[]|undefined>(undefined);
    const [error, setError] = useStateIfMounted<AxiosError|undefined>(undefined);

    useEffect(() => {
        getMoviesDbApi(theMovieDbTrendingDaily, setTredingmovieToGoDTO, setTredingMovies);
        getMoviesDbApi(theMovieDbPopulars, setPopularmovieToGoDTO, setPopularMovies);
        getMoviesDbApi(theMovieDbInTheater, setTheatermovieToGoDTO, setTheaterMovies);
        getUserWatchList();
    }, [])

    const getMoviesDbApi = async (urlMovieDb: string,
          setMovieToGo: React.Dispatch<React.SetStateAction<MovieToGoDTO[]>>,
          setMovieDb: React.Dispatch<React.SetStateAction<TheMovieDbDTO[]>>) => {

        await axios.get(urlMovieDb)
            .then(response => {

                var results = response.data.results;
                setError(undefined);
                setMovieDb([]);
                setMovieToGo([])
                setMovieDb(results);

                results.map(async (result: any) => {

                    var movieToGoDTO: MovieToGoDTO = {
                        id: 0,
                        theMovieDbId: 0,
                        voteAverage: 0,
                        voteCount: 0,
                        movieReviews: undefined,
                        movieVote: undefined
                    }

                   await createMovieToGoMovie(result.id)
                        .then(response => {
                            movieToGoDTO = response; 

                        })
                        .catch(error => {

                        });

                        
                    await axios.get(movieToGoUrlMovieVotesByMovieId + `/${movieToGoDTO.id}`)
                        .then(response => {
                            movieToGoDTO.movieVote = response.data
                          //  setMovieToGo(prevMovie=>[...prevMovie,movieToGoDTO])

                        })
                        .catch(error => {
                        });

                    setMovieToGo(prevMovie => [...prevMovie, movieToGoDTO])
                })
            })
            .catch(error => {
                let axiosError = error as AxiosError;
                setError(axiosError);
            });
    }

    const createMovieToGoMovie = async (id: number): Promise<MovieToGoDTO> => {

        let movieCreationDTO: MovieCreationDTO = { theMovieDbId: id }

        let movieToGoDTO: MovieToGoDTO = {
            id: 0,
            theMovieDbId: 0,
            voteAverage: 0,
            voteCount: 0,
            movieReviews: undefined,
            movieVote: undefined
        }

        await axios.post(movieToGoUrlMovies, movieCreationDTO)
            .then(response => {
                movieToGoDTO = response.data;
            })
            .catch(error => {
                let axiosError = error as AxiosError;
                setError(axiosError);
            });
        return movieToGoDTO;
    }


    function getUserWatchList() {
        try {
            axios.get(movieToGoUrlWatchListsUser)
                .then(response => {
                    setWatchListDTO(response.data)
                })
        }
        catch (error) {
            console.log(error);
        }
    }
    return (

        <Container fluid textAlign="left">
            <Segment color="teal" inverted>
                <Header textAlign="center" size="huge">
                    Movies Trending
                </Header>
            </Segment>
            <MovieCards theMovieDbDTO={tredingMovies}
                movieToGoDTO={tredingmovieToGoDTO}
                watchListDTO={watchListDTO} />

            <Segment color="grey" inverted>
                <Header textAlign="center" size="huge">
                    Movies Popular
                </Header>
            </Segment>

            <MovieCards theMovieDbDTO={popularMovies}
                movieToGoDTO={popularmovieToGoDTO}
                watchListDTO={watchListDTO} />

            <Segment color="brown" inverted>
                <Header textAlign="center" size="huge">
                    Movies In theater
                </Header>
            </Segment>

            <MovieCards theMovieDbDTO={theaterMovies}
                movieToGoDTO={theatermovieToGoDTO}
                watchListDTO={watchListDTO} />
        </Container>
    )
};




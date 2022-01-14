import axios from "axios"
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SearchProps, SearchResultData, Search, Input } from "semantic-ui-react"
import { movieToGoUrlMovies, theMovieDbImages, theMovieDbSearchByKeyword } from "../../endpoints";
import { MovieCreationDTO, MovieDetailsData, MovieToGoDTO } from "../../models/movie.models"

interface MovieResult {
    id: number;
    title: string;
    description: string;
    image: string;
}

type State = {
    loading: boolean
    results: MovieResult[]
    value: string | undefined
    theMovieDbData: any[]
    movieToGoData: MovieToGoDTO[] | undefined
}

type Action =
    | { type: 'START_SEARCH', query: string | undefined }
    | { type: 'FINISH_SEARCH', results: MovieResult[], theMovieDbData: any, movieToGoData: MovieToGoDTO[] | undefined }
    | { type: 'UPDATE_SELECTION', selection: string }
    | { type: 'CLEAN_QUERY' }

const initialState: State = {
    loading: false,
    results: [],
    value: '',
    theMovieDbData: [],
    movieToGoData: undefined
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return {
                 ...state, 
                 loading: false, 
                 results: action.results, 
                 theMovieDbData: action.theMovieDbData, 
                 movieToGoData: action.movieToGoData }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection }
        default:
            throw new Error()
    }
}

interface TheMovieDbSearchBarProps {

}

export default function TheMovieDbSearchBar(props: TheMovieDbSearchBarProps) {

    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [{ loading, results, value, theMovieDbData, movieToGoData }, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const theMovieDbQuery = async (keyword: string) => {

        try {

            var filteredResults: MovieResult[] = [];
            var movieToGoData: MovieToGoDTO[] = [];
            let response = await axios.get(theMovieDbSearchByKeyword + keyword);
            let results = response.data.results;
            
            results.map(async (result: any, index: number) => {
                
                let movieResult: MovieResult = {
                    id: 0,
                    title: "",
                    description: "",
                    image: ""
                }

                createMovieToGoMovie(result.id)
                    .then(movieToGoDTO => {

                        movieResult.id = result.id;
                        movieResult.title = result.title;
                        movieResult.description = result.release_date;
                        movieResult.image = theMovieDbImages + result.poster_path;

                        filteredResults.push(movieResult);
                        if(movieToGoDTO){
                            movieToGoData.push(movieToGoDTO);
                        }

                        filteredResults.sort((a: MovieResult, b: MovieResult) => {
                            var aDate = new Date(a.description);
                            var bDate = new Date(b.description);

                            return bDate.getTime() - aDate.getTime();
                        })

                        dispatch({ type: 'FINISH_SEARCH', results: filteredResults, theMovieDbData: results, movieToGoData: movieToGoData})
                    })
            })

        }
        catch (error) {
            console.log(error);
        }
    }

    const createMovieToGoMovie = async (id: number) => {

        let movieCreationDTO: MovieCreationDTO = { theMovieDbId: id }

        try {
            let response = await axios.post(movieToGoUrlMovies, movieCreationDTO);
            return response.data as MovieToGoDTO;
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSearchChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {

        const keyword = data.value;
        dispatch({ type: 'START_SEARCH', query: data.value });

        if (timer) {
            clearTimeout(timer);
            setTimer(undefined);
        }

        setTimer(
            setTimeout(() => {

                if (!keyword || keyword?.length === 0) {
                    dispatch({ type: 'CLEAN_QUERY' });

                    return;
                }

                theMovieDbQuery(keyword);
            }, 500)
        );
    }

    const handleResultSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: SearchResultData) => {
        const theMovieDbId = data.result.id;
        console.log(movieToGoData);
        const selectedTheMovieDbData = theMovieDbData?.find(data => data.id === theMovieDbId);
        const selectedMovieToGoData = movieToGoData?.find( data => data.theMovieDbId === theMovieDbId) ;
        console.log(selectedMovieToGoData);

        const movieDetailsData : MovieDetailsData = {
            movieToGoData: selectedMovieToGoData,
            theMovieDbData: selectedTheMovieDbData
        }
        
        console.log(movieDetailsData);
        navigate('/movie', { state: {movieDetailsData} })
    }

    return (
        <Search
            fluid
            results={results}
            value={value}
            loading={loading}
            size="huge"
            input={<Input fluid />}
            onSearchChange={handleSearchChange}
            onResultSelect={handleResultSelect}
        />
    )
};

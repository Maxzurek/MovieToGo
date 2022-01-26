import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Rating, RatingProps } from "semantic-ui-react";
import { movieToGoUrlMovieVotes } from "../../endpoints";
import { MovieToGoDTO, MovieVoteDTO, MovieVoteUpdateDTO } from "../../models/movie.models";


interface movieRatingProps {
    movieToGoDTO: MovieToGoDTO | undefined;
}

export default function MovieRating(props: movieRatingProps) {

    const [rating, setRating] = useState<any>(1);

    useEffect(() => {
        if (props.movieToGoDTO) {
            setRating(props.movieToGoDTO.movieVote?.vote)
        }
    }, [])


    const handleChangeOnRate = async (e: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {

        e.preventDefault();

        setRating(data.rating);

        if (props.movieToGoDTO?.movieVote === undefined) {
            postMovieVote(data.rating);
        }
        else {
            updateMovieVote(data.rating)
        }
    }

    const postMovieVote = async (rating: string | number | undefined) => {

        var movieVoteCreationDTO: MovieVoteDTO = {
            id: 0,
            vote: 0,
            user: undefined,
            movieId: 0
        }

        movieVoteCreationDTO.movieId = props.movieToGoDTO?.id;

        if (rating && typeof rating === 'number') {
            movieVoteCreationDTO.vote = rating
        }

        await axios.post(movieToGoUrlMovieVotes, movieVoteCreationDTO)
            .then((response: AxiosResponse<MovieVoteDTO>) => {
                if (props.movieToGoDTO) {
                    props.movieToGoDTO.movieVote = response.data;
                }

            })
            .catch(error => console.log(error))
    }

    const updateMovieVote = async (rating: string | number | undefined) => {

        var movieVoteUpdateDTO: MovieVoteUpdateDTO = {
            vote: 0
        }

        if (rating && typeof rating === 'number') {
            movieVoteUpdateDTO.vote = rating
        }

        await axios.put(movieToGoUrlMovieVotes + `/${props?.movieToGoDTO?.movieVote?.id}`, movieVoteUpdateDTO)
            .then(response => {
                if (props.movieToGoDTO?.movieVote) {
                    props.movieToGoDTO.movieVote = response.data;
                    console.log(props.movieToGoDTO.movieVote)
                }
            })
            .catch(error => console.log(error))
    }

    return (

        <Rating onRate={handleChangeOnRate}
            icon="star"
            maxRating={5}
            size="huge"
            rating={rating}
        />
    )
};

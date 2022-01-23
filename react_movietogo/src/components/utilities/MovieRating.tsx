import axios, { AxiosResponse, AxiosTransformer } from "axios";
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

        //add Rating
        var movieVoteCreationDTO: MovieVoteDTO = {
            id: 0,
            vote: 0,
            user: undefined,
            movieId: 0
        }
        var movieVoteUpdateDTO: MovieVoteUpdateDTO = {
            vote: 0
        }

        if (props.movieToGoDTO?.movieVote === undefined) {

            movieVoteCreationDTO.movieId = props.movieToGoDTO?.id;

            if (data.rating && typeof data.rating === 'number') {
                movieVoteCreationDTO.vote = data.rating
            }

            //console.log(movieVoteCreationDTO)
            await axios.post(movieToGoUrlMovieVotes, movieVoteCreationDTO)
                .then((response: AxiosResponse<MovieVoteDTO>) => {

                    if (props.movieToGoDTO?.movieVote) {
                        props.movieToGoDTO.movieVote = response.data;
                    }

                })
                .catch(error => console.log(error))

        }
        else {

            //Update Rating
            if (data.rating && typeof data.rating === 'number') {
                movieVoteUpdateDTO.vote = data.rating
            }

            await axios.put(movieToGoUrlMovieVotes + `/${props.movieToGoDTO.movieVote.id}`, { vote: data.rating })
                .then(response => {
                    if (props.movieToGoDTO?.movieVote) {
                        props.movieToGoDTO.movieVote = response.data;
                    }
                })
                .catch(error => console.log(error))
        }
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

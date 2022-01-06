namespace MovieToGoAPI.DTOs.Movies
{
    public class MovieUpdateDTO
    {
        public int TheMovieDbId { get; set; }

        public int? VoteAverage { get; set; }

        public int? VoteCount { get; set; }
    }
}

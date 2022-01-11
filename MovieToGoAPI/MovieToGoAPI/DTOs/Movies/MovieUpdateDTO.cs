namespace MovieToGoAPI.DTOs.Movies
{
    public class MovieUpdateDTO
    {
        public int TheMovieDbId { get; set; }

        public double? VoteAverage { get; set; }

        public int? VoteCount { get; set; }
    }
}

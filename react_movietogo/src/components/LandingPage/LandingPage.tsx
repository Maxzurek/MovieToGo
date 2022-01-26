import { useContext } from "react";
import { Container, Divider, Segment } from "semantic-ui-react";
import AppDataContext from "../contexts/AppDataContext";
import MovieCards from "./MovieCards";

export default function LandingPage() {

    const {
        userWatchListDTO,
        trendingTheMovieDbDTO,
        trendingMovieToGoDTO,
        popularTheMovieDbDTO,
        popularMovieToGoDTO,
        inTheatersTheMovieDbDTO,
        inTheatersMovieToGoDTO,
        isLoadingData } = useContext(AppDataContext);

    const renderCards = () => {
        return (
            <>
                <MovieCards
                    title='Trending Movies'
                    theMovieDbDTO={trendingTheMovieDbDTO}
                    movieToGoDTO={trendingMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />

                <Divider />

                <MovieCards
                    title='Popular Movies'
                    theMovieDbDTO={popularTheMovieDbDTO}
                    movieToGoDTO={popularMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />

                <Divider />

                <MovieCards
                    title='In Theaters'
                    theMovieDbDTO={inTheatersTheMovieDbDTO}
                    movieToGoDTO={inTheatersMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />
            </>
        )
    }

    return (

        <Container fluid textAlign="left">
            <Segment loading={isLoadingData}>
                {isLoadingData ? undefined : renderCards()}
            </Segment>
        </Container>
    )
};
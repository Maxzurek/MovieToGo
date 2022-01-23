import { useContext } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
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
                <Segment color="teal" inverted>
                    <Header textAlign="center" size="huge">
                        Movies Trending
                    </Header>
                </Segment>
                <MovieCards
                    theMovieDbDTO={trendingTheMovieDbDTO}
                    movieToGoDTO={trendingMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />

                <Segment color="grey" inverted>
                    <Header textAlign="center" size="huge">
                        Movies Popular
                    </Header>
                </Segment>

                <MovieCards
                    theMovieDbDTO={popularTheMovieDbDTO}
                    movieToGoDTO={popularMovieToGoDTO}
                    watchListDTO={userWatchListDTO}
                />

                <Segment color="brown" inverted>
                    <Header textAlign="center" size="huge">
                        Movies In theater
                    </Header>
                </Segment>

                <MovieCards
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
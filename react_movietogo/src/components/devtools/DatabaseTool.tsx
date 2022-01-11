import { useState } from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { movieToGoUrlMovieReviews, movieToGoUrlMovies, movieToGoUrlMovieVotes, movieToGoUrlWatchListItems, movieToGoUrlWatchLists, theMovieDbInTheater, theMovieDbPopulars, theMovieDbSearchByKeyword, theMovieDbTrendingDaily } from "../../endpoints";
import GenericDataTable from "../utilities/GenericDataTable";

export default function DatabaseTool() {

    const [refresh, setRefresh] = useState(false);

    const getURLS = [
        { url: movieToGoUrlMovies, tableName: "Movies" },
        { url: movieToGoUrlMovieReviews, tableName: "MovieReviews" },
        { url: movieToGoUrlMovieVotes, tableName: "MovieVotes" },
        { url: movieToGoUrlWatchLists, tableName: "WatchLists" },
        { url: movieToGoUrlWatchListItems, tableName: "WatchListItems" },
        { url: `${theMovieDbSearchByKeyword}avengers`, tableName: "TheMovieDb Search result" },
        { url: `${theMovieDbInTheater}`, tableName: "TheMovieDb In Theater Movies" },
        { url: `${theMovieDbPopulars}`, tableName: "TheMovieDb Popular Movies" },
        { url: `${theMovieDbTrendingDaily}`, tableName: "TheMovieDb Daily Trending Movies" },
        { url: `${theMovieDbTrendingDaily}`, tableName: "TheMovieDb Weekly Trending Movies" },
    ]

    return (
        <Container fluid >
            <Segment color="blue" inverted>
                <Header textAlign="center" size="huge">
                    Database Tool <Button color="blue" icon='refresh' onClick={() => setRefresh(true)}></Button>
                </Header>
            </Segment>
            {getURLS.map((value, index) => {
                return (
                    <GenericDataTable key={index} url={value.url} tableName={value.tableName} refresh={refresh} setRefresh={setRefresh} />
                )
            })}
        </Container>
    )
};

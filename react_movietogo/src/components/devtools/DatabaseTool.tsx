import { useState } from "react";
import { Button, Container, Header, Label, Segment } from "semantic-ui-react";
import { movieToGoUrlMovieReviews, movieToGoUrlMovies, movieToGoUrlMovieVotes, movieToGoUrlWatchListItems, movieToGoUrlWatchLists, theMovieDbMoviesSearch } from "../../endpoints";
import GenericDataTable from "../utilities/GenericDataTable";

export default function DatabaseTool() {

    const [refresh, setRefresh] = useState(false);

    const getURLS = [
        { url: movieToGoUrlMovies, tableName: "Movies" },
        { url: movieToGoUrlMovieReviews, tableName: "MovieReviews" },
        { url: movieToGoUrlMovieVotes, tableName: "MovieVotes" },
        { url: movieToGoUrlWatchLists, tableName: "WatchLists" },
        { url: movieToGoUrlWatchListItems, tableName: "WatchListItems" },
        { url: `${theMovieDbMoviesSearch}avengers`, tableName: "TheMovieDb Search result" },
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

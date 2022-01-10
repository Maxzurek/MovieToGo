import { useState } from "react";
import { Button, Container, Label } from "semantic-ui-react";
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
        <Container>
            <Container textAlign="center">
                <Label size="massive">Database Tool<Button icon='refresh' onClick={() => setRefresh(true)}></Button> </Label>
            </Container>
            {getURLS.map((value, index) => {
                return (
                    <GenericDataTable key={index} url={value.url} tableName={value.tableName} refresh={refresh} setRefresh={setRefresh} />
                )
            })}
        </Container>
    )
};

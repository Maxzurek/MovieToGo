import { useState } from "react";
import { Button, Container, Header, Popup, Segment } from "semantic-ui-react";
import { movieToGoUrlMovieReviews, movieToGoUrlMovies, movieToGoUrlMovieVotes, movieToGoUrlWatchListItems, movieToGoUrlWatchLists } from "../../endpoints";
import GenericDataTable from "../utilities/GenericDataTable";

export default function DatabaseTool() {

    const [refresh, setRefresh] = useState(false);

    const getURLS = [
        { url: movieToGoUrlWatchLists, tableName: "WatchLists" },
        { url: movieToGoUrlWatchListItems, tableName: "WatchListItems" },
        { url: movieToGoUrlMovieReviews, tableName: "MovieReviews" },
        { url: movieToGoUrlMovieVotes, tableName: "MovieVotes" },
        { url: movieToGoUrlMovies, tableName: "Movies" },
    ]

    return (
        <Container fluid >
            <Segment color="blue" inverted>
                <Header textAlign="center" size="huge">
                    Database Tool <Popup content='Refresh' trigger={<Button color="blue" icon='refresh' onClick={() => setRefresh(true)} />} />
                </Header>
            </Segment>
            {getURLS.map((value, index) => {
                return (
                    <Container key={index} fluid >
                        <GenericDataTable key={index} url={value.url} tableName={value.tableName} refresh={refresh} setRefresh={setRefresh} />
                    </Container>
                )
            })}
        </Container>
    )
};
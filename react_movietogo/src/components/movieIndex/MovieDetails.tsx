
import { Container, Grid, Header, Icon, Label, List, ListContent, ListIcon, ListItem, Rating, Search, Segment } from "semantic-ui-react"
import { MovieToGoDTO, TheMovieDbDTO } from "../../models/movie.models"
import ListItems from "./ListItems"


interface movieDetails {
    theMovieDbDTO: TheMovieDbDTO | undefined;
    movieToGoDTO: MovieToGoDTO | undefined;
}

export default function MovieDetails(props: movieDetails) {

 //   const itemsStyle = {font:bold }


    return (
        <>
            <Segment  >
                <Grid columns={2} stackable >
                    <Grid.Row verticalAlign='middle' textAlign='center'>
                        <Grid.Column>
                            <Header icon >
                                <Icon name='star' color="yellow" size="large" />
                                <span>AUDIENCE SCORE : {props.movieToGoDTO?.voteAverage} </span>

                            </Header>
                        </Grid.Column>

                        <Grid.Column>
                            <Header icon>
                                <Icon name='commenting' color="yellow" />
                                REVIEWS : {props.movieToGoDTO?.movieReviews?.length}
                            </Header>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment>
                <Container fluid textAlign="center">
                    <Header textAlign="left">DESCRIPTION : </Header>
                    <Header as='h3'>{props.theMovieDbDTO?.overview}</Header>
                </Container>
            </Segment>
            <br />

            <Segment>
            <br />
                <Grid  columns={2} doubling stackable >
                    <Grid.Column>
                        <Header>IMDB RATING</Header>
                        <ListContent >
                            <List.Item >{props.movieToGoDTO?.voteAverage}</List.Item>
                        </ListContent>
                    </Grid.Column>

                    <Grid.Column>
                        <Header>RELEASE DATE</Header>
                        <ListContent >
                            <List.Item >{props.theMovieDbDTO?.release_date}</List.Item>

                        </ListContent>
                    </Grid.Column>
                    <Grid.Column>
                        <Header>POPULARITY</Header>
                        <ListContent >
                            <List.Item >{props.theMovieDbDTO?.popularity}</List.Item>
                        </ListContent>
                    </Grid.Column>
                    <Grid.Column>
                        <Header>ORIGINAL LANGUAGE</Header>
                        <ListContent >
                            <List.Item >{props.theMovieDbDTO?.original_language.toUpperCase()}</List.Item>
                        </ListContent>
                    </Grid.Column>

                    <Grid.Column >
                        <Header >GENRES</Header>
                        <ListContent >
                            <ListItems genresIDs={props.theMovieDbDTO?.genre_ids} />
                        </ListContent>
                    </Grid.Column>


                    <Grid.Column>
                        <Header>VOTE COUNT</Header>
                        <ListContent >
                            <List.Item >{props.movieToGoDTO?.voteCount}</List.Item>
                        </ListContent>
                    </Grid.Column>
                </Grid>
            </Segment>

        </>
    )
};

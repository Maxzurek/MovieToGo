
import { Button, Container, Dropdown, Grid, Header, Icon, Label, List, ListContent, ListIcon, ListItem, Popup, Rating, Search, Segment } from "semantic-ui-react"
import { MovieToGoDTO, TheMovieDbDetailsDTO, TheMovieDbDTO } from "../../models/movie.models"
import { WatchListDTO } from "../../models/watchlist.models"
import Authorized from "../authentication/Authorized"
import DropDownWatchListItem from "../LandingPage/DropDownWatchListItem"
import ListItems from "./ListItems"


interface movieDetails {
    theMovieDbDTO: TheMovieDbDetailsDTO | undefined;
    movieToGoDTO: MovieToGoDTO | undefined;
    watchListDTO: WatchListDTO[] | undefined;
}

export default function MovieDetails(props: movieDetails) {

    const renderDropDownItems = () => {
        if (props.watchListDTO && props.movieToGoDTO) {
            return (
                props.watchListDTO?.map((watchList, index) => {

                    return (
                        <DropDownWatchListItem key={index} movieId={props.movieToGoDTO?.id} watchListDTO={watchList} />
                    );
                })
            )
        }
        else {
            return undefined;
        }
    }

    return (
        <>
            <Container>
                <Segment  >
                    <Grid columns={2} stackable >
                        <Grid.Row verticalAlign='middle' textAlign='center'>
                            <Grid.Column>
                                <Header icon >
                                    <Icon name='star' color="yellow" size="large" />
                                    <span> {props.movieToGoDTO?.voteAverage ? `AUDIENCE SCORE : ${props.movieToGoDTO?.voteAverage}` : "NO SCORE YET"} </span>

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
                    <Container fluid textAlign="left">
                        <Header> DESCRIPTION : </Header>
                        <Header as='h3'>{props.theMovieDbDTO?.overview}</Header>
                    </Container>
                </Segment>

                <Authorized
                    authorized={<>
                        <br /> <br />
                        <Container>
                            <Button.Group color='teal'>
                                {/* <Button>{props.watchListDTO ? "ADD TO WATCHLIST" : "NO WATCHLIST"}</Button> */}
                                <Dropdown
                                    button
                                    labeled
                                    text = {props.watchListDTO ? "ADD TO WATCHLIST " : "NO WATCHLIST "}
                                    className='button icon'
                                    floating
                                    icon='add'
                                    options={renderDropDownItems()}
                                    
                               
                                />
                            </Button.Group>

                        </Container>
                        <br /> <br />
                    </>
                    }
                    notAuthorized={<></>}
                />


                <Segment>
                    <br />
                    <Grid columns={2} doubling stackable >

                        <Authorized
                            authorized={
                                <Grid.Column>
                                    <Header>IMDB RATING</Header>
                                    <ListContent >
                                        <List.Item >{props.movieToGoDTO?.voteAverage}</List.Item>
                                    </ListContent>
                                </Grid.Column>
                            }
                            notAuthorized={<></>} />

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
                                  <ListItems genresIDs={props.theMovieDbDTO?.genres} />
                            </ListContent>
                        </Grid.Column>

                        <Authorized
                            authorized={
                                <Grid.Column>
                                    <Header>VOTE COUNT</Header>
                                    <ListContent >
                                        <List.Item >{props.movieToGoDTO?.voteCount ? props.movieToGoDTO?.voteCount : 0}</List.Item>
                                    </ListContent>
                                </Grid.Column>
                            }
                            notAuthorized={<></>} />
                    </Grid>
                </Segment>
            </Container>
        </>
    )
};

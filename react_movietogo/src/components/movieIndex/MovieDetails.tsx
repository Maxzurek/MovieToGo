
import { Button, Container, Dropdown, Grid, Header, Icon, ItemContent, Label, List, ListContent, ListIcon, ListItem, Popup, Rating, Search, Segment } from "semantic-ui-react"
import { MovieToGoDTO, TheMovieDbDetailsDTO, TheMovieDbDTO } from "../../models/movie.models"
import { WatchListDTO } from "../../models/watchlist.models"
import Authorized from "../authentication/Authorized"
import DropDownWatchListItem from "../LandingPage/DropDownWatchListItem"
import ListItemCompanies from "./ListItemCompanies"
import ListItemsGenres from "./ListItemsGenres"
import ListItems from "./ListItemsGenres"
import ListLanguages from "./ListLanguages"


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
                                <Header icon color="teal">
                                    <Icon name='star' color="yellow" size="large" />
                                    <span > {props.movieToGoDTO?.voteAverage ? `AUDIENCE SCORE : ${props.movieToGoDTO?.voteAverage}` : "NO SCORE YET"} </span>

                                </Header>
                            </Grid.Column>

                            <Grid.Column>
                                <Header icon color="teal">
                                    <Icon name='commenting' color="yellow" />
                                    REVIEWS : {props.movieToGoDTO?.movieReviews?.length}
                                </Header>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment>
                    <Container fluid textAlign="left">
                        <Header > DESCRIPTION : </Header>
                        <Header as='h4'>{props.theMovieDbDTO?.overview}</Header>
                    </Container>
                </Segment>

                <Authorized
                    authorized={<>
                        <br /> <br />
                        <Container>
                            <Button.Group color='teal'>
                                <Dropdown
                                    button
                                    labeled
                                    text={props.watchListDTO ? "ADD TO WATCHLIST " : "NO WATCHLIST "}
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
                    <Grid columns={2} doubling stackable textAlign="center" >

                        <Grid.Column  >
                            <Header color="teal">IMDB RATING</Header>
                            <ListContent  >
                                <ItemContent as="h4"> {props.movieToGoDTO?.voteAverage}</ItemContent>
                            </ListContent>
                        </Grid.Column>

                        <Grid.Column>
                            <Header color="teal">RELEASE DATE</Header>
                            <ListContent  >
                                <ItemContent as="h4"> {props.theMovieDbDTO?.release_date}</ItemContent>
                            </ListContent>
                        </Grid.Column>
                        <Grid.Column>
                            <Header color="teal">POPULARITY</Header>
                            <ListContent >
                                <ItemContent as="h4" >{props.theMovieDbDTO?.popularity}</ItemContent>
                            </ListContent>
                        </Grid.Column>

                        <Grid.Column >
                            <Header color="teal">BUDGET</Header>
                            <ListContent >
                                <ItemContent as="h4" >{props.theMovieDbDTO?.budget}</ItemContent>
                            </ListContent>
                        </Grid.Column>

                        <Grid.Column>
                            <Header color="teal">SPOKEN LANGUAGES</Header>
                            <ListContent >
                                <ListLanguages listItemLanguages={props.theMovieDbDTO?.spoken_languages} />
                            </ListContent>
                        </Grid.Column>

                        <Grid.Column >
                            <Header color="teal">PRODUCTION COMPANIES</Header>
                            <ListContent >
                                <ListItemCompanies listItemCompanies={props.theMovieDbDTO?.production_companies} />
                            </ListContent>
                        </Grid.Column>


                        <Grid.Column >
                            <Header color="teal">GENRES</Header>
                            <ListContent >
                                <ListItemsGenres genresIDs={props.theMovieDbDTO?.genres} />
                            </ListContent>
                        </Grid.Column>

                        <Grid.Column>
                            <Header color="teal">VOTE COUNT</Header>
                            <ListContent >
                                <ItemContent as="h4" >{props.movieToGoDTO?.voteCount ? props.movieToGoDTO?.voteCount : 0}</ItemContent>
                            </ListContent>
                        </Grid.Column>

                    </Grid>
                </Segment>
            </Container>
        </>
    )
};

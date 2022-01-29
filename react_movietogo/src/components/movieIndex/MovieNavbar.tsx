import { useState } from "react";
import { Container, Grid, GridColumn, GridRow, Header, Menu, MenuItem, Segment } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDetailsDTO, TheMovieDbDTO } from "../../models/movie.models";
import MovieDetails from "./MovieDetails";
import ReviewRating from "./ReviewRating";
import { WatchListDTO } from "../../models/watchlist.models";



export interface movieNavbar {
    theMovieDbDTO: TheMovieDbDetailsDTO | undefined;
    movieToGoDTO: MovieToGoDTO | undefined;
    watchListDTO: WatchListDTO[] | undefined;

}

export default function MovieNavbar(props: movieNavbar) {

    const [activeItem, setActiveItem] = useState('');
    const menuItemsStyle = { pading: "20px 80px" }

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    const renderSegment = () => {
        switch (activeItem) {
            case 'detailFilm':
                return (<MovieDetails theMovieDbDTO={props.theMovieDbDTO}
                    movieToGoDTO={props.movieToGoDTO}
                    watchListDTO={props.watchListDTO}
                />)
            case 'reviewRate':
                return (<ReviewRating movieToGoDTO={props.movieToGoDTO} />)
            default:
        }
    }

    const renderSegmentFunc = renderSegment();

    return (
        <Grid as={Menu} columns={6} stackable pointing secondary size='large' textAlign="center" color="blue">
            <GridRow textAlign="center"  >
                <GridColumn width={4}>
                </GridColumn>
                <GridColumn textAlign="center" width={3}>
                    <MenuItem
                        name='detailFilm'
                        active={activeItem === 'detailFilm'}
                        onClick={handleItemClick}
                        style={menuItemsStyle}
                    >
                        <Header  className="textfont"  textAlign="center" as="h3">  MOVIE DETAILS </Header>
                    </MenuItem>
                </GridColumn>
                <GridColumn width={1}>
                </GridColumn>
                <GridColumn width={1}>
                </GridColumn>
                <GridColumn textAlign="center" width={3}>
                    <MenuItem
                        name='reviewRate'
                        active={activeItem === 'reviewRate'}
                        onClick={handleItemClick}
                        style={menuItemsStyle}
                    >
                        <Header  textAlign="center" as="h3"> RATE AND REVIEW </Header>
                    </MenuItem>
                </GridColumn>
                <GridColumn width={4}>
                </GridColumn>
            </GridRow>
            <GridRow  >
                <Segment >
                    {activeItem ?
                        renderSegmentFunc
                        : <MovieDetails theMovieDbDTO={props.theMovieDbDTO}
                            movieToGoDTO={props.movieToGoDTO}
                            watchListDTO={props.watchListDTO} />
                    }
                </Segment>
            </GridRow>
        </Grid>
    )


}
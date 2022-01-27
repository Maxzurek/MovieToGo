import { useState } from "react";
import { Grid, GridColumn, GridRow, Menu, MenuItem, Segment } from "semantic-ui-react";
import { MovieToGoDTO, TheMovieDbDetailsDTO, TheMovieDbDTO } from "../../models/movie.models";
import MovieDetails from "./MovieDetails";
import ReviewRating from "./ReviewRating";
import Authorized from "../authentication/Authorized";
import { WatchListDTO } from "../../models/watchlist.models";


export interface movieNavbar {
    theMovieDbDTO: TheMovieDbDetailsDTO | undefined;
    movieToGoDTO: MovieToGoDTO | undefined;
    watchListDTO: WatchListDTO[] | undefined;

}

export default function MovieNavbar(props: movieNavbar) {

    const [activeItem, setActiveItem] = useState('');
    const menuItemsStyle = { padding: "20px 80px" }

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    

    const renderSegment = () => {
        switch (activeItem) {
            case 'detailFilm':
                return (<MovieDetails theMovieDbDTO={props.theMovieDbDTO}
                                      movieToGoDTO={props.movieToGoDTO} 
                                      watchListDTO ={props.watchListDTO}
                    />)
            case 'reviewRate':
                return (<ReviewRating movieToGoDTO={props.movieToGoDTO} /> )
            case 'TODO':
                console.log("reviews")
                break;
            default:
        }
    }

    const renderSegmentFunc = renderSegment();

    return (
        <>
            <Grid as={Menu} stackable pointing secondary size='large' textAlign="center" color="blue" verticalAlign="bottom">
                <GridRow   >
                    <GridColumn width={4}>
                    </GridColumn>
                    <GridColumn width={3}>
                        <MenuItem
                            name='detailFilm'
                            active={activeItem === 'detailFilm'}
                            onClick={handleItemClick}
                            style={menuItemsStyle}
                        >
                            MOVIE DETAILS
                        </MenuItem>
                    </GridColumn>
                    <GridColumn width={2}>
                    </GridColumn>
                    <GridColumn width={3}>
                        <MenuItem
                            name='reviewRate'
                            active={activeItem === 'reviewRate'}
                            onClick={handleItemClick}
                            style={menuItemsStyle}
                        >
                            RATE AND REVIEW
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
                                watchListDTO ={props.watchListDTO}/>
                        }
                    </Segment>
                </GridRow>
            </Grid>
        </>
    )


}
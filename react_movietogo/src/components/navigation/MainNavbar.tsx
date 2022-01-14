import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Container, Dropdown, Grid, GridColumn, GridRow, Header, Icon, Image, Item, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import { logout } from "../authentication/handleJWT";
import AuthenticationContext from "../contexts/AuthenticationContext";
import ModalContext from "../contexts/ModalContext";
import TheMovieDbSearchBar from "../utilities/TheMovieDbSearchBar";

export default function MainNavbar() {

    const { claims, update } = useContext(AuthenticationContext);
    const { displayAuthenticationModal } = useContext(ModalContext);

    const [activeItem, setActiveItem] = useState('home');
    const navigate = useNavigate();

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    const handleLogoutClick = () => {
        logout();
        update([]);
    }

    const getLoggedInUsername = () => {
        return claims.filter(x => x.name === 'username')[0]?.value;
    }

    return (
        <>
            <Grid as={Menu} stackable pointing secondary size='large' icon='labeled' color="blue" verticalAlign="bottom">
                <GridRow style={{ padding: 0 }}>
                    <GridColumn width={2}>
                        <Item as={NavLink} to='/'>
                            <Image src="/images/MovieToGo_Logo.ico" size="tiny"/>
                        </Item>
                    </GridColumn>
                    <GridColumn width={2}>
                        <Item as={NavLink} to='/jeremy' >
                            <Header>Jeremy</Header>
                        </Item>
                    </GridColumn>
                    <GridColumn width={2}>
                        <Item as={NavLink} to='/fatima' >
                            <Header>Fatima</Header>
                        </Item>
                    </GridColumn>
                    <GridColumn width={6}>
                        <TheMovieDbSearchBar />
                    </GridColumn>
                    <GridColumn width={2}>
                        <Authorized
                            authorized={
                                <Dropdown
                                    as='a'
                                    item
                                    trigger={<><Icon name='user outline' />{getLoggedInUsername()}</>}
                                    icon={null}
                                >
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' text='Edit Profile' name="edit" onClick={() => console.log("TODO redirect to edit profile")} />
                                        <Dropdown.Item icon='list' text='WatchLists' name="watchLists" onClick={() =>navigate('/watchlist')} />
                                        <Dropdown.Item icon='sign out' text='Logout' name="logout" onClick={handleLogoutClick} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                            notAuthorized={
                                <MenuItem onClick={() => displayAuthenticationModal(true)}>
                                    <Icon name='sign in' />
                                    Login
                                </MenuItem>
                            }
                        />
                    </GridColumn>
                    <GridColumn width={2}>
                        <Item as={NavLink} to='/dev' >
                            <Header>DevTools</Header>
                        </Item>
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
};

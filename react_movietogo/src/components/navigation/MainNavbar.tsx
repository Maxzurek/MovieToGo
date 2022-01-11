import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Icon, Image, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import { logout } from "../authentication/handleJWT";
import AuthenticationContext from "../contexts/AuthenticationContext";
import ModalContext from "../contexts/ModalContext";

export default function MainNavbar() {

    const { claims, update } = useContext(AuthenticationContext);
    const { displayAuthenticationModal } = useContext(ModalContext);

    const [activeItem, setActiveItem] = useState('home');

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
        <Container fluid>
            <Menu pointing secondary size='large' icon='labeled' color="blue">
                <MenuItem
                    as={Link}
                    to='/'
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                >
                    <Image src="/images/MovieToGo_Logo.ico" size="tiny" />
                </MenuItem>
                <MenuItem
                    as={Link}
                    to='/jeremy'
                    name="jeremy"
                    active={activeItem === 'jeremy'}
                    onClick={handleItemClick}
                ></MenuItem>
                    <MenuItem
                    as={Link}
                    to='/fatima'
                    name="fatima"
                    active={activeItem === 'fatima'}
                    onClick={handleItemClick}
                ></MenuItem>
                <MenuMenu position='right'>
                    <Authorized
                        authorized={
                            <Dropdown 
                                as='a'
                                item
                                trigger={<><Icon name='user outline' />{getLoggedInUsername()}</>}
                                icon={null}
                                //icon="user outline"
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='edit' text='Edit Profile' name="edit" onClick={() => console.log("TODO redirect to edit profile")} />
                                    <Dropdown.Item icon='list' text='WatchLists' name="watchLists" onClick={() => console.log("TODO redirect to watchlists")} />
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
                    <MenuItem
                        as={Link}
                        to='/dev'
                        name="devtools"
                        active={activeItem === 'devtools'}
                        onClick={handleItemClick}
                    >
                        Dev Tools
                    </MenuItem>
                </MenuMenu>
            </Menu>
        </Container>
    )
};

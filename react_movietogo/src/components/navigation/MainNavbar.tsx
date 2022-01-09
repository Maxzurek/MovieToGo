import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Image, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import { logout } from "../authentication/handleJWT";
import AuthenticationContext from "../contexts/AuthenticationContext";
import AuthenticationModalContext from "../contexts/AuthenticationModalContext";

export default function MainNavbar() {

    const { claims, update } = useContext(AuthenticationContext);
    const {setAuthModalOpen} = useContext(AuthenticationModalContext);

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
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
                    <Image src="/images/MovieToGo_Logo.ico" size="tiny"/>
                </MenuItem>
                <MenuMenu position='right'>
                    <Authorized
                        authorized={
                            <>
                                <MenuItem >
                                    Welcome {getLoggedInUsername()}
                                </MenuItem>
                                <MenuItem onClick={() => { logout(); update([]); }} >
                                    <Icon name='sign out' />
                                    Logout
                                </MenuItem>
                            </>
                        }
                        notAuthorized={
                            <MenuItem onClick={() => setAuthModalOpen(true)}>
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

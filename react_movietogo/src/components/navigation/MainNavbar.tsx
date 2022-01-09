import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Icon, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import AuthenticationModal from "../authentication/AuthenticationModal";
import { logout } from "../authentication/handleJWT";
import AuthenticationContext from "../authentication/AuthenticationContext";

export default function MainNavbar() {

    const { claims, update } = useContext(AuthenticationContext);

    const [activeItem, setActiveItem] = useState('home');
    const [openAuthentication, setOpenAuthentication] = useState(false);

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    return (
        <Container fluid>
            <Menu pointing secondary size='massive' icon='labeled'>
                <MenuItem
                    as={Link}
                    to='/'
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    src='../public.faviocn.ico'
                >
                    <img src='/images/MovieToGo_Logo.ico' />
                </MenuItem>
                <MenuMenu position='right'>
                    <Authorized
                        authorized={
                            <MenuItem onClick={() => { logout(); update([]); }} >
                                <Icon name='sign out' />
                                Logout
                            </MenuItem>
                        }
                        notAuthorized={
                            <MenuItem onClick={() => setOpenAuthentication(true)}>
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
            <AuthenticationModal open={openAuthentication} setOpen={setOpenAuthentication} blurred defaultSelection="login" />
        </Container>
    )
};

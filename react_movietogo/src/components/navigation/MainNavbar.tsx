import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, MenuItem, MenuMenu, Modal } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import AuthenticationModal from "../authentication/AuthenticationPopUp";

export default function MainNavbar() {

    const [activeItem, setActiveItem] = useState('home');
    const [openAuthentication, setOpenAuthentication] = useState(false)

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    return (
        <Container fluid>
            <Menu pointing secondary size='massive' >
                <MenuItem
                    as={Link}
                    to='/'
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                >
                    MovieToGo
                </MenuItem>
                <MenuMenu position='right'>
                    <MenuItem 
                        onClick={() => setOpenAuthentication(true)}
                    >
                        Sign Up
                    </MenuItem>
                    <Authorized
                        authorized={
                            <MenuItem
                                as={Link}
                                to='/dev'
                                name="devtools"
                                active={activeItem === 'devtools'}
                                onClick={handleItemClick}
                            >
                                Dev Tools
                            </MenuItem>
                        }
                        role="admin"
                    />
                </MenuMenu>
            </Menu>
            <AuthenticationModal open={openAuthentication} setOpen={setOpenAuthentication} blurred />
        </Container>
    )
};

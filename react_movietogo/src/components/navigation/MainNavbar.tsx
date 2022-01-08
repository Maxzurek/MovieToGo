import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import Authorized from "../authentication/Authorized";
import Authentication from "../Register/Authentication";

export default function MainNavbar() {

    const [activeItem, setActiveItem] = useState('home');

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
                    <Authentication />
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
        </Container>
    )
};

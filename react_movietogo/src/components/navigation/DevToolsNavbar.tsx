import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, MenuItem } from "semantic-ui-react";

export default function DevToolsNavbar() {

    const [activeItem, setActiveItem] = useState('devtools');

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    return (
        <Container fluid>
            <Menu pointing secondary>

                <MenuItem
                    as={Link} to='/'
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                >
                    Home
                </MenuItem>

                <MenuItem
                    as={Link} to='/dev'
                    name="devtools"
                    active={activeItem === 'devtools'}
                    onClick={handleItemClick}
                    position="right"
                >
                    Dev Tools
                </MenuItem>

            </Menu>
        </Container>
    )
};

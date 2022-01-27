import { useState } from "react";
import { Grid, GridRow, GridColumn, Menu, MenuItem, Segment, Header } from "semantic-ui-react";
import DatabaseTool from "./DatabaseTool";
import TestFormsTool from "./TestFormsTool";

export default function AdminToolIndex() {

    const [activeItem, setActiveItem] = useState('usermanagement');

    const menuItemsStyle = { padding: "13px 10px" }

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    const renderSegment = () => {
        switch (activeItem) {
            case 'database':
                return (<DatabaseTool />)
            case 'testform':
                return (<TestFormsTool />)
            case 'usermanagement':
                console.log("TODO: Render user management tool")
                return <></>
            default:
                return <></>
        }
    }

    return (
        <>
            <Grid padded >
                <GridRow >
                    <GridColumn width={3}>
                        <Menu fluid vertical tabular>

                            <MenuItem
                                name='usermanagement'
                                active={activeItem === 'usermanagement'}
                                onClick={handleItemClick}
                                style={menuItemsStyle}
                            >
                                User Management
                            </MenuItem>

                            <MenuItem
                                name='database'
                                active={activeItem === 'database'}
                                onClick={handleItemClick}
                                style={menuItemsStyle}
                            >
                                Database
                            </MenuItem>

                        </Menu>
                    </GridColumn>
                    <GridColumn width={13}>
                        <Segment>
                            {activeItem ?
                                renderSegment()
                                :
                                <Segment color="blue" inverted>
                                    <Header textAlign="center" size="huge">
                                        Dev Tools
                                    </Header>
                                    <Header size="tiny">Select and option</Header>
                                </Segment>
                            }
                        </Segment>
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
};

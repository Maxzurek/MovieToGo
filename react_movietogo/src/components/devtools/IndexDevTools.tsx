import { useState } from "react";
import { Grid, GridRow, GridColumn, Menu, MenuItem, Segment } from "semantic-ui-react";
import DevToolsNavbar from "../navigation/DevToolsNavbar";
import DatabaseTool from "./DatabaseTool";
import TestFormsTool from "./TestFormsTool";

export default function IndexAdminTools() {

    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
    }

    const renderSegment = () => {
        switch(activeItem){
            case 'database':
                return(<DatabaseTool />)
            case 'testform':
                return(<TestFormsTool />)
            default:
        }
    }

    const renderSegmentFunc = renderSegment();

    return (
        <>
            <DevToolsNavbar />

            <Grid padded style={{ height: '100vh' }}>
                <GridRow >
                    <GridColumn width={4}>
                        <Menu fluid vertical tabular>

                            <MenuItem
                                name='database'
                                active={activeItem === 'database'}
                                onClick={handleItemClick}
                            >
                                Database
                            </MenuItem>

                            <MenuItem
                                name='testform'
                                active={activeItem === 'testform'}
                                onClick={handleItemClick}
                            >
                                Test Forms
                            </MenuItem>

                        </Menu>
                    </GridColumn>
                    <GridColumn width={12} style={{ overflow: 'auto', maxHeight: '100%' }}>
                        <Segment>
                            {activeItem ? renderSegmentFunc : undefined}
                        </Segment>
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
};

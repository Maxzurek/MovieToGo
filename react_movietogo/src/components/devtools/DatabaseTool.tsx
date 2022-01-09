import { Container, Segment } from "semantic-ui-react";
import TableMovies from "./TableMovies";

export default function DatabaseTool() {

    return (
        <Container>
            <Container textAlign="center">
                <h1>Database Tool</h1>
            </Container>
            <Segment>
                <TableMovies />
            </Segment>
        </Container>
    )
};

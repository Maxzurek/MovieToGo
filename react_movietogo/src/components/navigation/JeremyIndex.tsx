import { Container } from "semantic-ui-react";
import TheMovieDbSearchBar from "../utilities/TheMovieDbSearchBar";

interface JeremyIndexProps {
}

export default function JeremyIndex(props: JeremyIndexProps) {

  return (

    <Container>
      <TheMovieDbSearchBar />
    </Container>
  );
}

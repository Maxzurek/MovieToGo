import { ItemContent, List } from "semantic-ui-react";

interface listItemsProps {
    genresIDs: any[] | undefined,
}

export default function ListItemsGenres(props: listItemsProps) {

    return (
        <div>
            {props.genresIDs?.map((item, index) => (
                <ItemContent as="h4" key={index} > {item.name}</ItemContent>
            ))}
        </div>
    )
}
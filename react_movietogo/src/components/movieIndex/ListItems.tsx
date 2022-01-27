import {List } from "semantic-ui-react";
interface listItemsProps {
 genresIDs: any[]|undefined,
}

export default function ListItems(props: listItemsProps) {

    return (
        <div>
            {props.genresIDs?.map((item, index) => (
                <List.Item key={index} > {item.name}</List.Item>
            ))}
        </div>
    )
}
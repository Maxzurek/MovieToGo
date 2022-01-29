import { ItemContent } from "semantic-ui-react";

interface listItemLanguagesProps {
    listItemLanguages: any[] | undefined,
}
export default function ListLanguages(props: listItemLanguagesProps) {

    return (
        <div>
            {props.listItemLanguages?.map((item, index) => (
                <ItemContent as="h4" key={index} > {item.name}</ItemContent>
            ))}
        </div>
    )
}
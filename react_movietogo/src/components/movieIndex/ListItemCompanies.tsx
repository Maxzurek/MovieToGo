import { ItemContent } from "semantic-ui-react";


interface listItemCompaniesProps {
    listItemCompanies: any[] | undefined,
}
export default function ListItemCompanies(props: listItemCompaniesProps) {

    return (
        <div>
            {props.listItemCompanies?.map((item, index) => (
                <ItemContent as="h4" key={index} > {item.name}</ItemContent>
            ))}
        </div>
    )
}
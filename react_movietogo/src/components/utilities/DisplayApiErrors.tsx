interface ApiErrorsProps{
    errors? : string[];
}

export default function DisplayApiErrors(props: ApiErrorsProps) {

    const style = {color : 'red'};

    return(
        <>
            {props.errors ? <ul style={style}>{props.errors.map((error, index) => <li key={index}>{error}</li>)}</ul> : undefined}
        </>
    )
};

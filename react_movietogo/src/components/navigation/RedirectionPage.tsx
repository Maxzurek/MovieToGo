import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Header } from "semantic-ui-react";

interface RedirectionPageProps{

}

export default function RedirectionPage(props: RedirectionPageProps) {

    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/');
    },[])

    return(
        <><Header>Unauthorized - Redirecting to home</Header></>
    )
};

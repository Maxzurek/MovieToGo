import Authorized from "../auth/Authorized";
import MainNavbar from "./MainNavbar";

export default function LandingPage() {
    return (
        <>
            <MainNavbar />
            <h1>MovieToGo</h1>
            <Authorized 
                authorized={<>You are authorized</>} 
                notAuthorized={<>You are not authorized</>}
                role="admin"
            />
        </>
    )
};

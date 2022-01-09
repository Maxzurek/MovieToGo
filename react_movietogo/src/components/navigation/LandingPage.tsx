import Authorized from "../authentication/Authorized";

export default function LandingPage() {
    return (
        <>
            <h1>Landing page</h1>
            <Authorized 
                authorized={<>You are authorized</>} 
                notAuthorized={<>You are not authorized</>}
                role="admin"
            />
        </>
    )
};

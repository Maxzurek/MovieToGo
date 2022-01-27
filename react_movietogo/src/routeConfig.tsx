import IndexDevTools from "./components/adminToolIndex/AdminToolIndex";
import LandingPage from "./components/LandingPage/LandingPage";
import MovieIndex from "./components/movieIndex/MovieIndex";
import RedirectionPage from "./components/navigation/RedirectionPage";
import WatchListIndex from "./components/navigation/WatchListIndex";
import { adminRole, loggedInUser } from "./roles";

const routes = [
    
    {path: '/admin', component: <IndexDevTools />, requiredRole: adminRole},
    {path: '/movie', component: <MovieIndex />, requiredRole: ''},
    {path: '/watchlist', component: <WatchListIndex />, requiredRole: loggedInUser},

    {path: '/', component: <LandingPage />, requiredRole:''},

    {path: '*', component: <RedirectionPage />, requiredRole:''},
]

export default routes;

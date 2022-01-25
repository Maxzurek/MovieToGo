import IndexDevTools from "./components/devtools/IndexDevTools";
import LandingPage from "./components/LandingPage/LandingPage";
import MovieIndex from "./components/movieIndex/MovieIndex";
import RedirectionPage from "./components/navigation/RedirectionPage";
import WatchListIndex from "./components/navigation/WatchListIndex";

const routes = [
    
    {path: '/dev', component: <IndexDevTools />, requiredRole: ''},
    {path: '/movie', component: <MovieIndex />, requiredRole: ''},
    {path: '/watchlist', component: <WatchListIndex />, requiredRole: ''},

    {path: '/', component: <LandingPage />, requiredRole:''},

    {path: '*', component: <RedirectionPage />, requiredRole:''},
]

export default routes;

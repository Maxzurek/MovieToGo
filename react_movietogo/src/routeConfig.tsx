import IndexDevTools from "./components/devtools/IndexDevTools";
import LandingPage from "./components/navigation/LandingPage";
import MovieIndex from "./components/navigation/MovieIndex";
import WatchListIndex from "./components/navigation/WatchListIndex";

const routes = [
    
    {path: '/dev', component: <IndexDevTools />, requiredRole: ''},
    {path: '/movie', component: <MovieIndex />, requiredRole: ''},
    {path: '/watchlist', component: <WatchListIndex />, requiredRole: ''},

    {path: '/', component: <LandingPage />, requiredRole:''},
]

export default routes;

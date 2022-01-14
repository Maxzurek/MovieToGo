import IndexDevTools from "./components/devtools/IndexDevTools";
import FatimaIndex from "./components/navigation/FatimaIndex";
import JeremyIndex from "./components/navigation/JeremyIndex";
import LandingPage from "./components/navigation/LandingPage";
import MovieIndex from "./components/navigation/MovieIndex";

const routes = [

    {path: '/jeremy', component: <JeremyIndex />, requiredRole: ''},
    {path: '/fatima', component: <FatimaIndex />, requiredRole: ''},
    {path: '/dev', component: <IndexDevTools />, requiredRole: ''},
    {path: '/movie', component: <MovieIndex />, requiredRole: ''},

    {path: '/', component: <LandingPage />, requiredRole:''},
]

export default routes;

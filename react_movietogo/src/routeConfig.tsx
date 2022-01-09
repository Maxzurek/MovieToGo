import IndexDevTools from "./components/devtools/IndexDevTools";
import LandingPage from "./components/navigation/LandingPage";

const routes = [
    {path: '/dev', component: <IndexDevTools />, requiredRole: ''},

    {path: '/', component: <LandingPage />, requiredRole:''},
]

export default routes;

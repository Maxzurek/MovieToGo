import IndexDevTools from "./components/devtools/IndexDevTools";
import LandingPage from "./components/navigation/LandingPage";
import Authentication from "./components/Register/Authentication";

const routes = [
    {path: '/dev', component: <IndexDevTools />, requiredRole: 'admin'},

    {path: '/register', component: <Authentication />, requiredRole:''},

    {path: '/', component: <LandingPage />, requiredRole:''},
]

export default routes;

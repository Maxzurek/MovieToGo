import IndexDevTools from "./components/devtools/IndexDevTools";
import LandingPage from "./components/navigation/LandingPage";

const routes = [
    {path: '/dev', component: <IndexDevTools />},

    {path: '/', component: <LandingPage />},
]

export default routes;

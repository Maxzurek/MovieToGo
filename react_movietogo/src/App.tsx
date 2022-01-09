import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from 'semantic-ui-react';
import routes from './routeConfig';
import { Claim } from './models/authentication.models';
import AuthenticationContext from './components/authentication/AuthenticationContext';
import MainNavbar from './components/navigation/MainNavbar';
import { useEffect, useState } from 'react';
import { getClaims } from './components/authentication/handleJWT';

export default function App() {

  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(()=>{
    setClaims(getClaims);
  }, [])

  const setClaimsTest = async (data: Claim[]) => {
    console.log("Setting claims");
    console.log(data);
    setClaims(data);
  }

  const isAdmin = () => {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  function getElement(requiredRole: string, componentToRender: JSX.Element) {
    if (requiredRole.length === 0) {
      return componentToRender;
    }
    if (requiredRole === 'admin' && isAdmin()) {
      return componentToRender;
    }

    return <h1>Unauthorized : You are not allowed to see this page. Please log in first.</h1>;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{claims, update: setClaimsTest }}>
        <MainNavbar />
        <Container fluid>
          <Routes>
            {routes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={getElement(route.requiredRole, route.component)}>
              </Route>)}
          </Routes>
        </Container>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  )
};
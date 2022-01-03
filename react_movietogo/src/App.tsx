import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from 'semantic-ui-react';
import routes from './routeConfig';
import { useState } from 'react';
import { claim } from './models/auth.models';
import AuthenticationContext from './components/auth/AuthenticationContext';

export default function App() {

  const [claims, setClaims] = useState<claim[]>([
    { name: 'role', value: 'admin' },
  ]);

  const isAdmin = () => {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  const isLoggedIn = () => {
    return claims.length > 0;
  }

  function getElement(requiredRole:string, componentToRender: JSX.Element) {
    if(requiredRole.length === 0){
      return componentToRender;
    }
    if(requiredRole === 'admin' && isAdmin()){
      return componentToRender;
    }
    if(requiredRole === 'loggedIn' && isLoggedIn()){
      return componentToRender;
    }

    return <h1>Unauthorized : You are not allowed to see this page. Please log in first.</h1>;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
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
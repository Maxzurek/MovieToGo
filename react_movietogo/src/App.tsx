import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from 'semantic-ui-react';
import routes from './routeConfig';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid>

        <Routes>
          {routes.map(route => <Route key={route.path} path={route.path} element={route.component} />)}
        </Routes>

      </Container>

    </BrowserRouter>
  )
};
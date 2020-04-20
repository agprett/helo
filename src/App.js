import React from 'react';
import './App.css';
import {withRouter, useLocation} from 'react-router-dom'
import routes from './routes'
import Nav from './Components/Nav/Nav'

function App() {
  const location = useLocation()

  return (
    <div>
      {location.pathname === '/' ? null : <Nav />}
      {routes}
    </div>
  );
}

export default withRouter(App);

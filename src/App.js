import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Movement from './Movement'

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link to={'/login'} className="nav-link">login</Link>      
              </li>
              <li className="nav-item">
                <Link to={"/Register"} className="nav-link" >Sign up</Link>
              </li> 
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">  
        <div className="auth-inner">
          <Switch>
            {/* <Route exact path='/' component={Login} />*/}
             <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} /> 
            <Route path="/Movement" component={Movement} /> 
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
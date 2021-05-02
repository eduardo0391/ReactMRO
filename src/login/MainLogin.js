import React from 'react';  
import './App.css';  
import Login from "./Login";  
import Dashboard from "./login/Dashboard";  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';   
 
function MainLogin() {  
  return (  
    <Router>      
      <div className="container">      
        <nav className="navbar navbar-expand-lg navheader">      
          <div className="collapse navbar-collapse" >      
            <ul className="navbar-nav mr-auto">      
              <li className="nav-item">      
                <Link to={'/login'} className="nav-link">login</Link>      
              </li>    
              <li className="nav-item">      
                <Link to={'/Register'} className="nav-link">Register</Link>      
              </li>    
            </ul>      
          </div>      
        </nav> <br />      
        <Switch>        
          <Route path='/login' component={Login} />
          <Route path='/Dashboard' component={Dashboard} />  
          {/* <Route path='/Register' component={Register} />     */}
     
        </Switch>      
      </div>      
    </Router>     
  );  
}  
  
export default MainLogin;
import React, {useEffect, useState} from 'react'
import '../login/Login.css'
import axios from 'axios';


function Login(props)
{
const [user, setUser] = useState({Email:'', Password:''});
//const apiUrl= "http://localhost:1010/api/User/Login";
const [error, setError]=useState("");
 const apiUrl= "http://localhost:55205/api/User/Login"

const Login = (e) => {
      setError('');
      e.preventDefault();
      const data= {User : user.User, Password : user.Password};
      axios.post(apiUrl, data)
      .then((result)=> {
        const serializedState = JSON.stringify(result.data.user);
        localStorage.setItem('myUser', serializedState);
        if (result.data.status)
           props.history.push('/Movement');
          else
            setError('user invalid');
      })
}

useEffect(()=>{

    console.log(user);

}, []);

const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
}

return (
    <div className="auth-wrapper">  
    <div className="auth-inner">
        <form onSubmit={Login}>
        <h3>Sign In</h3>

        <div className="form-group">
            
            <label>Email address</label>
            <input type="Text" class="form-control" value={user.User} 
            placeholder="User or Email" onChange={onChange} name="User"></input>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="Password" class="form-control" value={user.Password}
            placeholder="Password" onChange={onChange} name="Password"></input>
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" onSubmit={Login} className="user" className="btn btn-primary btn-block">Submit</button>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
        
        { error ? <span className="alert alert-danger" >{error}</span>: null }
        </form>
    </div>
    </div>
)
}


export default Login;
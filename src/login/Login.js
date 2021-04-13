import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios';


function Login(props)
{
const [user, setUser] = useState({Email:'', Password:''});
const apiUrl= "http://localhost:1010/api/User/Login"


const Login = (e) => {
      e.preventDefault();
      const data= {User : user.User, Password : user.Password};
      axios.post(apiUrl, data)
      .then((result)=> {
        // const serializedState = JSON.stringify(result.data.user);
        localStorage.setItem('myUser', user.User);
        if (result.data.status)
           props.history.push('/Dashboard');
          else
              alert('user invalid');
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
    <div>
        <div class="text-center">
            <h1>Welcome</h1>
        </div> 
        <form onSubmit={Login} className="user">
            <div class="form-group">
                <input type="Text" class="form-control" value={user.User} 
                placeholder="User or Email" onChange={onChange} name="User"></input>

                <input type="Password" class="form-control" value={user.Password}
                placeholder="Password" onChange={onChange} name="Password"></input>
                
                <button type="submit">Entrar</button>
            </div>
        </form>

    </div>
)
}


export default Login;
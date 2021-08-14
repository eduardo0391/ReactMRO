import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Register(props)
{
    const [user, setUser] = useState({UserName:"", Password:"", RepeatPassword:"", Email:"", Name:"" })
    const Register = (e) => {

    }
    const apiUrl= "http://localhost:55205/api/User/";

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
     }
     const RegisterNewUser= ()=>{
         console.log(user);
         const userData= user;
         axios.post(apiUrl, userData)
         .then(
         (result)=>{
             console.log(result);
         }
         )
         .catch(
             (error)=>
             {
                 console.log(error);
             }
         )
     }
    return (
       <div className="auth-wrapper">  
            <div className="auth-inner">
                <form onSubmit={Register}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            
                            <label>User</label>
                            <input type="Text" class="form-control" value={user.UserName} 
                            placeholder="User" name="UserName" onChange={onChange} >
                            </input>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="Password" class="form-control" value={user.Password}
                            placeholder="Password" name="Password" onChange={onChange} ></input>
                        </div>

                        <div className="form-group">
                            <label>Repeat Password</label>
                            <input type="Password" class="form-control" value={user.RepeatPassword}
                            placeholder="Repeat Password" name="RepeatPassword" onChange={onChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="Name" class="form-control" value={user.Name}
                            placeholder="Name"name="Name" onChange={onChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="Email" class="form-control" value={user.Email}
                            placeholder="Email" name="Email" onChange={onChange}></input>
                        </div>

                        <button type="button" className="btn btn-primary btn-block" onClick={()=>RegisterNewUser()}>Sign up</button>
                </form>
            </div>
        </div>
) 
}
export default Register;
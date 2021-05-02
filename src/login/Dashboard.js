import react, {useEffect, useState} from 'react'
import App from '../App'
function Dashboard()
{
    const [user, setUser] = useState('prueba')
    useEffect(()=>{
             var userData = localStorage.getItem('myUser');
             var user = JSON.parse(userData);
            console.log(user);
             setUser(user);
    }, []);

    return (
        <div>
        <div class="col-sm-12 btn btn-primary">Usuario</div>
        { <h1>Welcome: {user? user.email: "hola"}</h1> }
        <App></App>
        </div>
    )
}

export default Dashboard;
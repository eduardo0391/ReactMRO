import react, {useEffect, useState} from 'react'
function Dashboard()
{
    const [user, setUser] = useState({Email:'', User:''})
    useEffect(()=>{
            var userData = localStorage.getItem('myUser');
            var user = JSON.parse(userData);
            console.log("holaaa");
            setUser(user);
    }, []);

    return (
        <div>
        <div class="col-sm-12 btn btn-primary">Usuario</div>
        <h1>Welcome: {user? user.Email: "hola"}</h1>
        </div>
    )
}

export default Dashboard;
import { Link, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'

const NavBar = () => {
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    return (
        <div className= "nav-bar">
            <Link to='/'><p>Home</p></Link>
            

            {localStorage.getItem('userId') ? <>
                <Link to='/search'><p>Search</p></Link>
                
                <Link to='/upload'><p>Upload</p></Link>
                
                <Link to='/profile'><p>Profile</p></Link>
                
                <span onClick={() => { localStorage.removeItem('userId'); setUser({}) }}>
                    <Link to='/'><p>Log Out</p></Link>
                </span></>
                : <>
                    <Link to='/login'><p>Login</p></Link>
                    
                    <Link to='/signup'><p>Sign Up</p></Link>
                </>}
        </div>

    )
}

export default NavBar

import axios from 'axios'
import { useContext, useState } from 'react'
import { UserContext } from '../context/usercontext'
import {Redirect} from 'react-router-dom'

const LoginPage = () => {
    const backEnd = process.env.REACT_APP_BACKEND

    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    
    const [input, setInput] = useState({})
    
    const [ redirect, setRedirect ] = useState(false)
   
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${backEnd}/users/login`, input).then(
            (res) => {localStorage.setItem('userId', res.data.encryptedId)
            setUser(res.data.user)
            setRedirect(true)
          
            })
    }

    return(
        <div className="login-div">
            <h1>Login</h1>
        { redirect && <Redirect to={`/`} exact /> }
        <form className="login-form" onSubmit={handleSubmit}>
            
                <label htmlFor="email">Email</label>
                <input className="login-form-input" value={input.email} onChange={(e) => setInput({...input, email: e.target.value})} />
        
                <label htmlFor="password">Password</label>
                <input className="login-form-input" type="password" value={input.password} onChange={(e) => setInput({...input, password: e.target.value})} />
           
                <input className="submit-login"type="submit" value="Log In!" />
            
        </form>
    </div>
    )
}
export default LoginPage
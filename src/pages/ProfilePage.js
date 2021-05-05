import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/usercontext'

import FavoriteSamples from '../components/FavoriteSamples'
import SearchResults from '../components/SearchResults'
import axios from 'axios'
const ProfilePage = (props) => {

    const backEnd = process.env.REACT_APP_BACKEND
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    const [samples, setSamples] = useState([])


    const getUserSamples = async () => {
        let res = await axios.get(`${backEnd}/users/samples`, {
            headers: {
                Authorization: user.id
            }
        })
        setSamples(res.data)
    }

    useEffect(() => { getUserSamples() }, [user])

    return (
        <div className="profile-div">
            <h1>Hello, {user.name}</h1>
            <h2>User Samples</h2>
            <div className="user-samples">
                
                {samples.length > 0 ? <SearchResults samples={samples} />
                    : <p>...loading</p>}
            </div>
            <h2>Favorite Samples</h2>
            <div className="user-samples">
                
                <FavoriteSamples favSamples={props.favSamples} />
            </div>
        </div>
    )
}

export default ProfilePage
import axios from 'axios'
import { Redirect, Link, useParams } from 'react-router-dom'
import { useState } from 'react'
const OwnerButtons = (props) => {
    const params = useParams()
    const backEnd = process.env.REACT_APP_BACKEND
    const [redirect, setRedirect] = useState(false)

    const deleteClick = async () => {
        let res = await axios.delete(`${backEnd}/userCreatedSamples/${props.oneSample.id}`)
        setRedirect(true)
    }
    return (
        <>
            { redirect && <Redirect to={`/profile`} exact />}

            <span>
               <Link to ={`/editusersample/${params.id}`}><button className="edit-button">Edit Name/Description</button></Link>
                <button className="delete-button" onClick={deleteClick}>Delete Sample</button>
            </span>
        </>
    )
}

export default OwnerButtons
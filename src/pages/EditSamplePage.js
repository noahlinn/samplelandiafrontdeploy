import { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
const backEnd = process.env.REACT_APP_BACKEND
const EditSamplePage = () => {
    const params = useParams()
    const [redirect, setRedirect] = useState(false)
    const [oneSample, setOneSample] = useState('')

    const getOneSample = async () => {
        try {
            const res = await axios.get(`${backEnd}/usercreatedsamples/${params.id}`)
            setOneSample(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getOneSample() }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${backEnd}/usercreatedsamples/${params.id}`, oneSample)
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="edit-page">
            {redirect && <Redirect to={`/sample/${oneSample.id}`} exact />}
            <h2>Edit Sample</h2>
            <form className="login-form" onSubmit={onSubmit}>
                
                    <label htmlFor="title">Title</label>
                    <input value={oneSample.name} onChange={(e) => setOneSample({ ...oneSample, name: e.target.value })} />
                

                
                    <label htmlFor="description">Description</label>
                    <textarea type="text" value={oneSample.description} onChange={(e) => setOneSample({ ...oneSample, description: e.target.value })} />
            
                    <input type="submit" value="Update Sample!" />
                
            </form>
        </div>
    )
}

export default EditSamplePage
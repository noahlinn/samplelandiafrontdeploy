import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


const UploadPage = () => {
    const [file, setFile] = useState([])
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)
    const [description, setDescription] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [results, setResults] = useState({})
    const type = ['audio/wav', 'audio/mp3']
    const backEnd = process.env.REACT_APP_BACKEND

    const changeHandler = (e) => {
        e.preventDefault()
        let selected = e.target.files[0]
        if (selected && type.includes(selected.type))
        {
            setError('')
            const reader = new FileReader()
            reader.onload = (e) => {
                
                setUrl(e.target.result)
            }
            reader.readAsDataURL(selected)
            setFile(selected)
        } else {
            setFile(null)
            setError('.wav and .mp3 files only')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(file)
        let userId = localStorage.getItem("userId")

        try {
            let res = await axios.post(`${backEnd}/userCreatedSamples`, {
                name: file.name,
                description: description,
                file: url
            },
                {
                    headers: {
                        Authorization: userId
                    }
                }
            )
            setResults(res.data)
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className= "upload-page">
        { redirect && <Redirect to={`/sample/${results.id}`} exact /> }
        <h1>Upload Sample</h1>
            <form className="upload-form"encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                    <input className="upload-file" type="file" onChange={changeHandler} required />
                </div>
                <div>
                    <textarea type='textarea' placeholder='Description' onChange={(e) => setDescription({ description: e.target.value })} />
                </div>

                <div className='output'>
                    {error && <div className="error">{error}</div>}
                    {file && <div className="file">{file.name}</div>}
                </div>
                <input className="submit-button" type="submit" value="Submit" />
            </form>
 

            {/* <button onClick={download}>Download</button> */}
        </div>
    )
}
export default UploadPage
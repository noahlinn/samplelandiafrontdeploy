import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SingleSample from '../components/SingleSample'
const backEnd = process.env.REACT_APP_BACKEND
const EachSamplePage = (props) => {
    const params = useParams()
    const [oneSample, setOneSample] = useState([])
    const [preview, setPreview] = useState('')
    const [userCreated, setUserCreated] = useState(null)

    const checkIfUserCreated = () => {
        if (params.id.includes('-')) {
            setUserCreated(true)
        } else {
            setUserCreated(false)
        }
    }
    const getOneSample = async () => {
        if (userCreated === false) {
            const res = await axios.get(`${backEnd}/samples/${params.id}`)
            setOneSample(res.data)
            setPreview(res.data.previews['preview-hq-mp3'])
        }
        else if (userCreated === true) {
            const res = await axios.get(`${backEnd}/usercreatedsamples/${params.id}`)
            setOneSample(res.data)
            setPreview(res.data.file)
        }
    }

    const downloadURI = (uri, name) => {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
    }

    const downloadFile = () => {
        if(userCreated){
            downloadURI(preview, oneSample.name)
        }
        else{
        window.location.href = oneSample.download}
    }

    useEffect(() => { checkIfUserCreated()}, [])
    useEffect(() => { getOneSample() }, [userCreated])


    return (
        <>
            <SingleSample oneSample={oneSample} saveSample={props.saveSample} deleteSaved={props.deleteSaved}
                preview={preview} downloadFile={downloadFile} favIds={props.favIds}/>
        </>
    )
}
export default EachSamplePage
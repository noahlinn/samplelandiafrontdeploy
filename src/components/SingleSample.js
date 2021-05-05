import OwnerButtons from '../components/OwnerButtons'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/usercontext'
import {useParams} from 'react-router-dom'
const SingleSample = (props) => {
    const params = useParams()
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState

    return (
        <div className = "profile-div">
            <h1>{props.oneSample.name}</h1>
            
            {props.favIds.includes(params.id) 
            ? <span onClick = {() => props.deleteSaved(params.id)}><h2 className="heart-fill">❤️</h2></span>
            : <span onClick = {() => props.saveSample(params.id, props.oneSample.name)}><h2 className="heart-hollow">♡</h2></span>}
            
            <p>{props.oneSample.description}</p>
            <AudioPlayer
                autoPlay={false}
                src={props.preview}
            /><div className="dl-div" onClick={props.downloadFile} >
            <img className="dl-image"src="https://icon-library.com/images/white-download-icon/white-download-icon-4.jpg"/>
            <p>download</p>
            </div>
            {props.oneSample.userId === user.id && <>
                <OwnerButtons oneSample={props.oneSample}/>
                </>}
        </div>
    )
}
export default SingleSample
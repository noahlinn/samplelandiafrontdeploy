

import { Link } from 'react-router-dom'

const FavoriteSamples = (props) => {

    return (
        props.favSamples ? props.favSamples.map((sample) => (
            <Link to={`/sample/${sample.sampleId}`}> <div className="each-result-div" key={sample.sampleId}> 
            <h3 className="link">{sample.sampleName}</h3>
            </div></Link>
        )) : null

    )
}
export default FavoriteSamples
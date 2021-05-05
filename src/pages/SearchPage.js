
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
const backEnd = process.env.REACT_APP_BACKEND
const SearchPage = () => {
    const [samples, setSamples] = useState([])
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [results, setResults] = useState(false)
    const [freeSounds, setFreeSounds] = useState(true)

    const handleSubmit = async (e) => {
        setResults(true)
        e.preventDefault()
        if (freeSounds === true) {
            getFreeSoundSamples()
        }
        else if (freeSounds === false) {
            getSampleLandiaSamples()
        }
        else {
            return null
        }
    }

    const getSampleLandiaSamples = () => {
        axios.get(`${backEnd}/userCreatedSamples/search/${query.query}`).then(
            res => setSamples(res.data)

        )
    }

    const getFreeSoundSamples = () => {
        axios.post(`${backEnd}/samples/search`, { query, page }).then(
            res => setSamples(res.data.results)
        )
        setPage(+page + 1)
    }

    const onClick = async () => {
        getFreeSoundSamples()
    }

    const newSearch = () => {
        setResults(false)
        setPage(1)
    }

    const setTrue = (e) => {
        setFreeSounds(true)
        
    }

    const setFalse = () => {
        setFreeSounds(false)
    }

    return (
        <div className="search-div">
            {results === false &&
                <>
                    <h1>Search</h1>
                    <span className="search-buttons"><button className={freeSounds ? "free-button" : "free-button-dis"} onClick={setTrue}>FreeSounds</button>
                    <button className={freeSounds ? "samp-button-dis" : "samp-button"}onClick={setFalse}>sampleLandia</button></span>
                    {freeSounds ? <p>Search FreeSounds</p> : <p>Search sampleLandia</p>}
                    <SearchBar setPage={setPage} query={query} setQuery={setQuery}
                        handleSubmit={handleSubmit} freeSounds={freeSounds} setFreeSounds={setFreeSounds} /> </>}

            {/* {samples.length > 1 && */}
            {results && <> <h1>Results</h1><SearchResults samples={samples} />
               <span className="result-buttons"> {freeSounds && <button className="more-button" onClick={() => { onClick() }}>See More</button>}
                <button className="new-button" onClick={() => { newSearch() }}>New Search?</button></span>
            </>}


        </div>
    )
}

export default SearchPage
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import EachSamplePage from './pages/EachSamplePage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import EditSamplePage from './pages/EditSamplePage'
import './App.css';
import { Route } from 'react-router-dom'
import { UserContext } from './context/usercontext'
function App() {
  const backEnd = process.env.REACT_APP_BACKEND

  const { userState } = useContext(UserContext)
  const [user, setUser] = userState
  const [favSamples, setFavSamples] = useState([])
  const [favIds, setFavIds] = useState([])

  const getUserInfo = async () => {
    const userId = localStorage.getItem('userId')
    try {
      let res = await axios.get(`${backEnd}/users/info`, {
        headers: {
          Authorization: userId
        }
      })
      
      if (res.data.user) {
        setUser(res.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getUserInfo() }, [])

  const saveSample = async (sampleId, sampleName) => {
    try {
      let res = await axios.post(`${backEnd}/users/save`, {
        sampleId: sampleId,
        sampleName: sampleName
      }, {
        headers: {
          Authorization: user.id
        }
      })
      getSavedSamples()
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedSamples = async () => {
    try {
      let res = await axios.get(`${backEnd}/users/savedsamples`, {
        headers: {
          Authorization: user.id
        }
      })
      setFavSamples(res.data.favoirteSample)
      let favIds = []
      for(let each of res.data.favoirteSample){
        favIds.push(each.sampleId)
      }
      setFavIds(favIds)
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getSavedSamples() }, [user])

  const deleteSaved = async (sampleId) => {
    try {
      let res = await axios.delete(`${backEnd}/users/delete/${sampleId}`,  {
        headers: {
          Authorization: user.id
        }
      })
      getSavedSamples()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <NavBar />
      <Route exact path='/' render={() => <HomePage />} />
      <Route exact path='/search' render={() => <SearchPage />} />
      <Route exact path='/signup' render={() => <SignUpPage />} />
      <Route exact path='/login' render={() => <LoginPage />} />
      <Route exact path='/sample/:id' render={() => <EachSamplePage deleteSaved={deleteSaved} favIds={favIds} favSamples={favSamples} saveSample={saveSample} />} />
      <Route exact path='/upload' render={() => <UploadPage />} />
      <Route exact path='/profile' render={() => <ProfilePage favSamples={favSamples} />} />
      <Route exact path='/editusersample/:id' render={() => <EditSamplePage />} />

    </div>
  );
}

export default App;

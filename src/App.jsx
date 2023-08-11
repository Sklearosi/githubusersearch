import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

    
    const [light, setLight] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [user, setUser] = useState('octocat')
    const [userInfo, setUserInfo] = useState({
      userName: ``,
      user: ``,
      date: ``,
      repos: ``,
      followers: ``,
      following: ``,
      location: ``,
      blog: ``,
      twitter: ``,
      company: ``,
      hero: ``,
      bio: ``
    })
    
    useEffect(() => {
     const getData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${user}`)
        setUserInfo({
          userName: response.data.name,
          user: response.data.login,
          date: `Joined ${response.data.created_at.slice(8, 10)} ${months[response.data.created_at.slice(5,7) - 1]} ${response.data.created_at.slice(0,4)}`,
          repos: response.data.public_repos,
          followers: response.data.followers,
          following : response.data.following,
          location : response.data.location,
          blog: response.data.blog,
          twitter: response.data.twitter_username,
          company: response.data.company,
          hero : response.data.avatar_url,
          bio : response.data.bio
        })
        
        setNotFound(false)
      } catch (error) {
        setNotFound(true)
      }
     }

     getData()
    }, [user])

    

    /* object unda chavwero amdeni hukis nacvlad*/

 

  let inputThing

  return (

    
    <>
    <div className='heading'>
      <h1 style={light ?  {color : "#222731"} : {color : "white"} }>devfinder</h1>
      <div className='dark-light'><p style={light ? {color : "#4B6A9B"} : {color : "white"} }>{light ? 'DARK' : 'LIGHT'}</p><img  src={light ? "/assets/icon-moon.svg" :"/assets/icon-sun.svg" } alt="" onClick={() => {
        setLight(!light)
        document.body.style.backgroundColor = light ? "#141D2F" :  "#F6F8FF";
      }} /></div>
    </div>
    <div style={light ? {backgroundColor : "#FEFEFE"} : {backgroundColor : "#1E2A47"} } className='search-bar'>
      <div className='icon-search'>
      <img src="/assets/icon-search.svg" alt="" />
      <input style={light ?  {color : "#222731"} : {color : "white"} }   className={light ? ' ' : 'inputt'}  placeholder='Search GitHub username…' type="input" onChange={(e) => {
        setInputValue(e.target.value)
      }}/>
      </div>
      <button onClick={() => {
        setUser(inputValue);
        if(light) {
        document.querySelector('.inputtt').value = ""
        } else {
          document.querySelector('.inputt').value = ""
        }
        setInputValue('')
      }}>Search</button>
    </div>

    {notFound ? <p style={light ? {color: '#4B6A9B', backgroundColor:'transparent'} : {color: '#FFFFFF',backgroundColor:'transparent'}}  className='not-found'>User Not Found</p> : <div style={light ? {backgroundColor : "#FEFEFE"} : {backgroundColor : "#1E2A47"} }className="main-container">
      <div className='container'><img className='hero' src={userInfo.hero} alt="" />
      <div className='user-info'>
        <p style={light ? {color :'#2B3442'} : {color: "white"}} className='name'> {userInfo.userName === null ? 'Name is not available' : userInfo.userName}   </p>
      <p style={{color: '#0079FF'}}>@{userInfo.user}</p>
      <p style={light ? {color: '#697C9A'} : {color: 'white'}}> {userInfo.date} </p>
      </div>
      </div>
      <div className='bio-div' >
      <p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}} className='bio'>{userInfo.bio === null ? 'User does not have bio' : userInfo.bio}</p>
      </div>
      <div >
        <div style={light ? {backgroundColor : "#F6F8FF"} : {backgroundColor : "#141D2F"} } className='info'>
        <div className='additional-info'><p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>Repos</p><p style={light ? {color : '#2B3442'} : {color : 'white'}}>{userInfo.repos}</p></div>
        <div className='additional-info'><p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>Followers</p><p style={light ? {color : '#2B3442'} : {color : 'white'}}>{userInfo.followers}</p></div>
        <div className='additional-info'><p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>Following</p><p style={light ? {color : '#2B3442'} : {color : 'white'}}>{userInfo.following}</p></div>
        </div>
      </div>
      <div className='links'>
        <div style={userInfo.location === null ? {opacity:'0.5'} : {opacity: '1'}}  className='link'><img  src="/assets/icon-location.svg" alt=""  /><p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>{userInfo.location === null ? 'Not available'  :userInfo.location}</p></div>
        <div style={userInfo.blog.length <= 0 ? {opacity:'0.5'} : {opacity: '1'}} className='link'><img src="/assets/icon-website.svg" alt="" />{userInfo === null ? <p  style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>{userInfo.blog.length <= 0 ? 'Not available'  : userInfo.blog}</p> : <a href={userInfo.blog} style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>{userInfo.blog.length <= 0 ? 'Not available'  : userInfo.blog}</a>}</div>
        <div style={userInfo.twitter === null ? {opacity:'0.5'} : {opacity: '1'}} className='link'><img src="/assets/icon-twitter.svg" alt="" /><p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>{userInfo.twitter === null ? 'Not available' :userInfo.twitter}</p></div>
        <div style={userInfo.company === null ? {opacity:'0.5'} : {opacity: '1'}} className='link'><img src="/assets/icon-company.svg" alt="" /><p style={light ? {color: '#4B6A9B'} : {color: '#FFFFFF'}}>{userInfo.company === null ? 'Not available'  :userInfo.company}</p></div>
      </div>
    </div>}
    </>
  )
}

export default App

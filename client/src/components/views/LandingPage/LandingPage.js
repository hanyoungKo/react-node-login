import React from 'react'
import {logoutUser } from '../../../_actions/user_action'
import {Link} from 'react-router-dom'


function LandingPage() {

  const clickLogout =()=>{
    logoutUser()
  }

  
    return (
      <div className='LandingPage'>
       <Link to="/login">로그인</Link>
        <button onClick={clickLogout}>로그아웃</button>

      </div>
  )
}

export default LandingPage;
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../../_actions/user_action';
import './LoginPage.css';


function LoginPage() {
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   
   const dispatch = useDispatch();

   const navigate = useNavigate();

   const changeEmail=(e)=>{
     setEmail(e.target.value);
   }
   const changePassword=(e)=>{
    setPassword(e.target.value);
   }
   const submitForm=(e)=>{
    
    e.preventDefault();
    
    let body={
      email:email,
      password:password
    }

    dispatch(loginUser(body))
     .then(res =>{
      if(res.payload.loginSuccess){
          navigate("/")
      }else{
        alert("로그인 실패");
        setEmail("");
        setPassword("");
      }
     }) 
    
   }

  return (
    <div className='LoginPage'>
        <form className='LoginPage_form' onSubmit={submitForm}>
            <label>Email</label>
            <input type='email' value={email} onChange={changeEmail}/>
            <label>Password</label>
            <input type='password' value={password} onChange={changePassword}/>
            <br/>
            <button type='submit'>
                Login
            </button>
        </form>
    </div>
  )
};

export default LoginPage;
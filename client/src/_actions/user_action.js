import axios from "axios";
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types' 


export const loginUser= (dataTosubmit)=>{
    const request = axios.post('api/users/login', dataTosubmit)
   .then(res=>res.data)
   return{
    type: LOGIN_USER,
    payload: request
   }
}

export const registerUser = (dataTosubmit)=>{
   const request = axios.post('api/users/register', dataTosubmit)
   .then(res=>res.data)
   return{
    type: REGISTER_USER,
    payload: request
   }
}

export const logoutUser = ()=>{
   axios.get('api/users/logout')
   .then(res=>{
      if(res.data.success){
         alert("로그아웃 되셨습니다.");
      }else{
         alert("잘못된 접근 입니다.")
      }

   })
}

export const auth =()=>{
   const request = axios.get('api/users/auth')
   .then(res=>res.data)
   return{
    type: AUTH_USER,
    payload: request
   }
}
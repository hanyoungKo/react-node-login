import React,{useState} from 'react'
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';


import './RegisterPage.css';
function RegisterPage() {
  
  const [email,setEmail] = useState("");
  const [name,setName] = useState(""); 
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const changeEmail=(e)=>{
    setEmail(e.target.value);
  }
  const changePassword=(e)=>{
   setPassword(e.target.value);
  }
  const changeName=(e)=>{
    setName(e.target.value);
  }
  const changeConfirmPassword=(e)=>{
   setConfirmPassword(e.target.value);
  }


  const submitForm = (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.")
    }

    let body={
      email,name,password
    }
    registerUser(body)
    .then((res)=>{
      if(res.RegisterSuccess){
        navigate("/login");
      }else{
        alert("회원가입에 실패했습니다.")
      }
    })
  }
  return (
    <div className='RegisterPage'> 
        <form className='RegisterPage__form' onSubmit={submitForm}>
            <label>Email</label>
            <input type='email' value={email} onChange={changeEmail}/>
            <label>Name</label>
            <input type='text' value={name} onChange={changeName}/>
            <label>Password</label>
            <input type='password' value={password} onChange={changePassword}/>
            <label>Confirm Password</label>
            <input type='password' value={confirmPassword} onChange={changeConfirmPassword}/>
            <br/>
            <button type='submit'>
                Join US
            </button>
        </form>
    </div>
  )
}

export default RegisterPage;
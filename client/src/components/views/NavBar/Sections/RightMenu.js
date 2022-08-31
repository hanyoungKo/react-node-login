import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {logoutUser} from '../../../../_actions/user_action'

function RightMenu(props) {
  const user = useSelector(state => state.user);
  // 저장된 값 가져오기

  const logoutHandler = () => {
    logoutUser()
    window.location.reload();
    
  };

  if (user.UserData && !user.UserData.isAuth) {
    return (
      <ul>
        <li>
        <Link to="/login">로그인</Link>
        </li>
        <li>
        <Link to="/register">회원가입</Link>
        </li>
      </ul>
    )
  } else {
    return (
    <ul>
        <li onClick={logoutHandler}>Logout</li>
    </ul>  
    )
  }
}

export default RightMenu;
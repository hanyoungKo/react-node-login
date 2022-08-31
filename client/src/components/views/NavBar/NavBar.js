import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';


function NavBar() {

  return (
    <nav
    className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%', display: 'flex' }}
    >
      <div className="menu__logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu />
        </div>
        <div className="menu_rigth">
          <RightMenu />
        </div>
      </div>

    </nav>
  )
}

export default NavBar
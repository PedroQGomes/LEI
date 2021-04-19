import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import 'react-pro-sidebar/dist/css/styles.css';
function Navbar() {

  const { logout } = useAuth();

  const [click, setClick] = useState(false);
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);



  async function logOutUser () {
    setClick(false);
    await logout();
  }

  return (
    <div>
      <nav className='navbar'>  
        <Link to='/dashboard' className='navbar-logo' onClick={closeMobileMenu}>
          Ferrache
          <i className='fab fa-firstdraft' />
        </Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Profile
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={logOutUser}>
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
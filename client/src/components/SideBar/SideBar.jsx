import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link,useHistory } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';
import { useAuth } from '../../context/AuthContext';


function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const { logout } = useAuth();
  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);

  async function logoutUser (){
      await logout();
      history.push("/");
  } 


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to='/profile' className='nav-text'>
            Profile
          </Link>
          <Link onClick={logoutUser} className='nav-text'>
              Logout 
          </Link>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
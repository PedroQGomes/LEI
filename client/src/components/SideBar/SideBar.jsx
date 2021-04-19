import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link,useHistory } from 'react-router-dom';
import './SideBar.css';
import { useAuth } from '../../context/AuthContext';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarContent,SidebarFooter } from 'react-pro-sidebar';
import { IconContext } from 'react-icons';

function SideBar() {

  const { logout } = useAuth();
  const history = useHistory();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  async function logoutUser (){
      await logout();
      history.push("/");
  } 


  return (
    <>
     <div className='sidebar'>
        <ProSidebar collapsed={sidebar}>
          <SidebarContent>
            <Menu iconShape="square">
            <MenuItem icon={<FaIcons.FaBars />}>Dashboard</MenuItem>
            <MenuItem icon={<FaIcons.FaBars />}>Dashboard</MenuItem>
            <MenuItem icon={<FaIcons.FaBars />}>Dashboard</MenuItem>
            <MenuItem icon={<FaIcons.FaBars />}>Dashboard</MenuItem>
            <SubMenu title="Components" icon={< AiIcons.AiFillHome />}>
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu>
          </Menu>
          </SidebarContent>
          
        </ProSidebar>
        </div>
    </>
  );
}

export default SideBar;
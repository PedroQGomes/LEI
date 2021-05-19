import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as BSIcons from 'react-icons/bs';
import * as GOIcons from 'react-icons/go';
import { Link,useHistory } from 'react-router-dom';
import './SideBar.css';
import { useAuth } from '../../context/AuthContext';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarContent,SidebarFooter } from 'react-pro-sidebar';
import { IconContext } from 'react-icons';

function SideBar() {

  const history = useHistory();

  const [sidebar, setSidebar] = useState(false);
  const handleChange = () => {
    history.push("/profile");
    
  };


  return (
    <>
     <div className='sidebar'>
        <ProSidebar collapsed={sidebar} width ="15vw" >
          <SidebarContent>
            <Menu iconShape="square">
            <MenuItem icon={<GOIcons.GoGraph />}>Dashboard <Link to="/dashboard" /></MenuItem>
            <SubMenu title="Pesquisa" icon={< BSIcons.BsSearch />}>
              <MenuItem>Por Referencia <Link to="/search/ref" /></MenuItem>
              <MenuItem>Por Nome <Link to="/search/name" /> </MenuItem>
              <MenuItem>Por Categoria <Link to="/search/category" /> </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaIcons.FaWarehouse />}>Inventario <Link to="/inventory" /> </MenuItem>
            <MenuItem icon={<BiIcons.BiEnvelope />}>Encomendas <Link to="/orders" /> </MenuItem>
            <MenuItem icon={<BSIcons.BsGearFill />}>Definições <Link to="/settings" /> </MenuItem>
          </Menu>
          </SidebarContent>

        </ProSidebar>
        </div>
    </>
  );
}

export default SideBar;
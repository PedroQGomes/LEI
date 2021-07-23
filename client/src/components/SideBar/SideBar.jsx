import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as BSIcons from 'react-icons/bs';
import * as GOIcons from 'react-icons/go';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarContent } from 'react-pro-sidebar';
import CustomScrollbars from 'react-custom-scrollbars'

function SideBar() {


  const [sidebar, setSidebar] = useState(false);

  return (
    <>
     <div className='sidebar'>
        <ProSidebar collapsed={sidebar} width ="15vw" >
          <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <SidebarContent>
            <Menu iconShape="square">
            <MenuItem icon={<GOIcons.GoGraph />}>Dashboard <Link to="/dashboard" /></MenuItem>
            <SubMenu title="Pesquisa" icon={< BSIcons.BsSearch />}>
              <MenuItem>Por Referencia <Link to="/search/ref" /></MenuItem>
              <MenuItem>Por Nome <Link to="/search/name" /> </MenuItem>
              <MenuItem>Por Categoria <Link to="/search/category" /> </MenuItem>
            </SubMenu>
            <SubMenu title="Inventario" icon={<FaIcons.FaWarehouse />}>
              <MenuItem>Barcelos <Link to="/inventory/9" /></MenuItem>
              <MenuItem>Viana <Link to="/inventory/10" /> </MenuItem>
              <MenuItem>Guimarães <Link to="/inventory/11" /> </MenuItem>
              <MenuItem>Santander <Link to="/inventory/132" /></MenuItem>
              <MenuItem>Leiria <Link to="/inventory/200" /> </MenuItem>
              <MenuItem>Caldas <Link to="/inventory/201" /> </MenuItem>
            </SubMenu>
            <MenuItem icon={<BiIcons.BiEnvelope />}>Encomendas <Link to="/orders" /> </MenuItem>
            <MenuItem icon={<BSIcons.BsGearFill />}>Definições <Link to="/settings" /> </MenuItem>
          </Menu>
          </SidebarContent>
          </CustomScrollbars>
        </ProSidebar>
        </div>
    </>
  );
}

export default SideBar;
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import '../../../styled/header.scss';
import {
 BugOutlined,
 SearchOutlined,
 ShoppingOutlined,
 UserOutlined
  } from "@ant-design/icons";

const Header = () => {
 return (
   <header>
    <div className="container">
     <h1 className="logo">
      <BugOutlined />                                                                                                                                     
      <NavLink to='/' className="logo">MyInsect</NavLink>
     </h1>
     <nav className="nav">
      <NavLink
        to='/'
        className={({isActive}) => isActive ? 'link active' : 'link'}
      >
       Home
      </NavLink>
      <a href="#" className="link">Catalog</a>
      <a href="#" className="link">About</a>
      <a href="#" className="link">Contact</a>
     </nav>
     <div className="icons">
      <SearchOutlined />
      <ShoppingOutlined />
      <p>|</p>
      <UserOutlined />
     </div>
    </div>
   </header>
 );
};

export default Header;
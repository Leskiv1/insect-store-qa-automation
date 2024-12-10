import React, {useState} from 'react';
import {NavLink, Link} from "react-router-dom";
import './header.scss';
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
      <NavLink
								to='catalog'
                end
								className={({isActive}) => isActive ? 'link active' : 'link'}
						>
							Catalog
				</NavLink>
        <NavLink
        to='cart'
        className={({isActive}) => isActive ? 'link active' : 'link'}
        >
        Shopping cart
        </NavLink>
     </nav>
     <div className="icons">
      <SearchOutlined />
      <ShoppingOutlined />
      <p>|</p>
      <Link to="/signup"><UserOutlined /></Link>
     </div>
    </div>
   </header>
 );
};

export default Header;
import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../loyaoutsComp/header/Header";
import Footer from "../loyaoutsComp/footer/Footer";

const Layout = () => {
	return (
			<>
				<Header/>
				<Outlet/>
				<Footer/>
			</>
	);
};

export default Layout;
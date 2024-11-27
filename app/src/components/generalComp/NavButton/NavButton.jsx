import React from "react";
import './navButton.scss';
import {Link} from "react-router-dom";


const NavButton = ({to, children, additionalClass=''}) => {
	return (
		<Link className={`navButton ${additionalClass}`} to={to}>
			{children}
		</Link>
	);
};

export default NavButton
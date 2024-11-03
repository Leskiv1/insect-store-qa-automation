import React from 'react';
import './nameFind.scss';

const NameFind = ({children, type}) => {
	return (
			<input className="nameFind" placeholder={children} type={type}/>
	);
};

export default NameFind;
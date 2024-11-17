import React from 'react';
import './nameFind.scss';

const NameFind = ({children, type, value, onChange}) => {
	return (
			<input
					value={value}
					onChange={onChange}
					className="nameFind"
					placeholder={children}
					type={type}
			/>
	);
};

export default NameFind;
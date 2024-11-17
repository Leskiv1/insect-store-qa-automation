import React from 'react';
import './button.scss';

const Button = ({additionalClass = '', children, onClick}) => {
	return (
			<button onClick={onClick} className={`btn ${additionalClass}`}>
				{children}
			</button>
	);
};

export default Button;
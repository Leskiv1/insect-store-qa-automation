import React from 'react';
import './button.scss';

const Button = ({additionalClass = '', children}) => {
	return (
			<button className={`btn ${additionalClass}`}>
				{children}
			</button>
	);
};

export default Button;
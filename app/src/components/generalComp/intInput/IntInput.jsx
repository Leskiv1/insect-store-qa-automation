import './intInput.scss';
import React from 'react';

const IntInput = ({value, setValue}) => {
	return (
			<div className="intInput">
				<button
						className="decrease"
						onClick={() => {
							setValue(prev => prev > 1 ? prev - 1 : 1);
						}}
				>-</button>
				<input
						type="number"
						value={value}
						min="1"
						onChange={(e) => {
							const input = e.target.value;
							const intValue = parseInt(input, 10);

							if (input === '') {
								setValue(1);
							} else if (!isNaN(intValue) && intValue >= 1) {
								setValue(intValue);
							}
						}}
				/>
				<button
						className="increase"
						onClick={() => {
							setValue(prev => prev + 1);
						}}
				>+</button>
			</div>
	);
};

export default IntInput;
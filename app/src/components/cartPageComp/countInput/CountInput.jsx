import React, {useEffect, useState} from 'react';
import './countInput.scss';

const CountInput = ({startCount, updateCount, deleteCart}) => {
	const [value, setValue] = useState(+startCount);
	const [debounceTimer, setDebounceTimer] = useState(null);

	useEffect(() => {
		if (debounceTimer) clearTimeout(debounceTimer);

		const timer = setTimeout(() => {
			if (value === 0) {
				deleteCart();
			} else {
				updateCount(value);
			}
		}, 1500);

		setDebounceTimer(timer);

		return () => clearTimeout(timer);
	}, [value, updateCount, deleteCart]);

	return (
			<div className="countInput">
				<button
						className="decrease"
						onClick={() => {
							setValue(prev => prev > 0 ? prev - 1 : 0);
						}}
				>-</button>
				<input
						type="number"
						value={value}
						min="0"
						onChange={(e) => {
							const input = e.target.value;
							const intValue = parseInt(input, 10);

							if (input === '') {
								setValue(0);
							} else if (!isNaN(intValue) && intValue >= 0) {
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
				 <button
  className="delete"
  onClick={deleteCart} // Виклик функції
>
  Видалити
</button>
			</div>
	);
};

export default CountInput;
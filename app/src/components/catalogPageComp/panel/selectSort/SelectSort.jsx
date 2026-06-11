import React from 'react';
import './selectSort.scss';

const SelectSort = ({sortName, labelText, options, value, onChange}) => {
	return (
			<div className="sortContainer">
				<label htmlFor={sortName}>{labelText}</label>
				<select
						className={`sort ${sortName}`} name={sortName}
						value={value}
						onChange={onChange}
				>
					{[...options.entries()].map(([key, value]) => (
							<option key={key} value={key}>{value}</option>
					))}
				</select>
			</div>
	);
};

export default SelectSort;
import React from 'react';
import './viewCard.scss';

const ViewCard = ({name, children, img, price}) => {
	return (
			<div className="card">
				<div className="img">
					<img src={img} />
				</div>
				<div className="title">
					<h2>{name}</h2>
					<span>{price}$</span>
				</div>
				<p>{children}</p>
			</div>
	);
};

export default ViewCard;
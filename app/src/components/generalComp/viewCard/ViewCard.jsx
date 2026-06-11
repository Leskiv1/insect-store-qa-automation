import React from 'react';
import './viewCard.scss';
import NavButton from '../NavButton/NavButton';

const ViewCard = ({name, children, img, price, id}) => {
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
				<div className="View">
				<NavButton to={`/catalog/${id}`}> View more</NavButton>
				</div>
			</div>
	);
};

export default ViewCard;
import React from 'react';
import './card.scss';
import NavButton from '../../generalComp/NavButton/NavButton';

 export {NavButton};

const Card = ({name, img, batches, price, description, id}) => {
	return (
			<div className="card">
				<div className="img">
				<NavButton to={`/catalog/${id}`}>
					<img src={img} alt={name} />
				</NavButton>
				</div>
				<div className="title">
					<h2>{name}
					<h3>{price}$</h3>
					</h2>
					<span>{batches} batches</span>
				</div>
				<p>{description}</p>
				<NavButton additionalClass="buttonContainer" to={`/catalog/${id}`}>View more</NavButton>
			</div>
	);
};

export default Card;
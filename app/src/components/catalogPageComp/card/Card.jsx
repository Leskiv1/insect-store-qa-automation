import React from 'react';
import './card.scss';
import NavButton from '../../generalComp/NavButton/NavButton';

 export {NavButton};

const Card = ({name, img, batches, price, description, id}) => {
	return (
			<div className="card">
				<div className="img">
					<img src={img} alt=""/>
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
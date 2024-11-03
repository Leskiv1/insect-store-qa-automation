import React from 'react';
import './card.scss';
import Button from "../panel/button/Button";

const Card = ({name, img, batches, price, description}) => {
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
				<div className="buttonsContainer">
					<Button additionalClass="update">Update</Button>
					<Button additionalClass="delete">Delete</Button>
				</div>
			</div>
	);
};

export default Card;
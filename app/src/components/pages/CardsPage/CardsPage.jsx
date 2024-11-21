import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';
import { NavButton } from '../../catalogPageComp/card/Card';
import {getInsectById} from "../../../assets/api/api";
import './CardsPage.scss'



const CardPage= () => {
	const {id} = useParams();
	const [insect, setInsect] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const insect = await getInsectById(id);
			setInsect(insect);
		}
		fetchData().then()
	}, [])

	const images = {
		butterfly: butterflyImg,
		bee: beeImg,
		ladybug: ladybagImg,
	};

	return (
		<main className=" cardPage">
			<div className="container">
				<div className="cardContainer">
					<div className="img">
						<img src={images[insect.type]} alt=""/>
					</div>
					<div className="text">
							<span className="type">Type: {insect.type}</span>
							<span className="batches">Batches: {insect.batches}</span>
						<h2 className="name">{insect.name}</h2>
						<p className="description">{insect.description}</p>
					</div>
				</div>
				<div className="itemFooter">
					<span className="price">Price: {insect.price}$</span>
					<div className="buttons">
						{/* <Button onClick={() => alert('Coming soon')} additionalClass="itemButton">Add to cart</Button> */}
						<NavButton to="/catalog">Go back</NavButton>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CardPage;
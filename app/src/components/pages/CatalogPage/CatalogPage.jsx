import React, {useEffect, useState} from 'react';
import './CatalogPage.scss';
import Panel from "../../catalogPageComp/panel/Panel";
import Card from "../../catalogPageComp/card/Card";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';
import {getInsects} from "../../../assets/api/api";
import Loader from "../../generalComp/loader/Loader";


const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybug: ladybagImg,
};

const CatalogPage = () => {
	const [filteredInsects, setFilteredInsects] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchInsects = async () => {
			setLoading(true)
			const insects = await getInsects({});
			setFilteredInsects(insects);
			setLoading(false)
		}
		fetchInsects().then();
	}, [])

	return (
			<main className="catalogPage">
				<Panel
						setFilteredInsects={setFilteredInsects}
						setLoading={setLoading}
				/>

				<div className="cardContainer container">
					{loading ? (<div className="loader-container"><Loader /></div>) :
					(filteredInsects.map((card) => (
							<Card
								key={card.id}
								id={card.id}
								name={card.name}
								description={card.description}
								img={images[card.type]}
								price={card.price}
								batches={card.batches}
							/>
					)))}
				</div>
                
			</main>
	);
};

export default CatalogPage;
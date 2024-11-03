import React from 'react';
import './CatalogPage.scss';
import Panel from "../../catalogPageComp/panel/Panel";
import Card from "../../catalogPageComp/card/Card";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';

const cards = [
	{
		id: 1,
		name: 'Butterfly 1',
		type: 'butterfly',
		batches: 12,
		price: 20,
		description: 'Add a touch of elegance to your collection with this beautiful butterfly specimen! Vibrant colors, delicate details, and intricate patterns make it a stunning piece. Ideal for enthusiasts, nature lovers, or as a unique gift.'
	},
	{
		id: 2,
		name: 'Bee 1',
		type: 'bee',
		batches: 7,
		price: 10,
		description: 'Enhance your collection with this carefully preserved bee specimen! Showcasing fine details and natural beauty, it’s ideal for collectors, educators, or anyone intrigued by pollinators.'
	},
	{
		id: 3,
		name: 'Ladybag 1',
		type: 'ladybag',
		batches: 2,
		price: 30,
		description: 'Add a dash of luck to your collection with this beautifully preserved ladybug! Known for its vibrant red and iconic black spots, it’s perfect for collectors, educators, or nature lovers.'
	},
	{
		id: 4,
		name: 'Butterfly 2',
		type: 'butterfly',
		batches: 5,
		price: 5,
		description: 'Add a touch of elegance to your collection with this beautiful butterfly specimen! Vibrant colors, delicate details, and intricate patterns make it a stunning piece. Ideal for enthusiasts, nature lovers, or as a unique gift.'
	},
	{
		id: 5,
		name: 'Bee 2',
		type: 'bee',
		batches: 10,
		price: 80,
		description: 'Enhance your collection with this carefully preserved bee specimen! Showcasing fine details and natural beauty, it’s ideal for collectors, educators, or anyone intrigued by pollinators.'
	},
	{
		id: 6,
		name: 'Ladybag 2',
		type: 'ladybag',
		batches: 3,
		price: 25,
		description: 'Add a dash of luck to your collection with this beautifully preserved ladybug! Known for its vibrant red and iconic black spots, it’s perfect for collectors, educators, or nature lovers.'
	}
];

const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybag: ladybagImg,
};

const CatalogPage = () => {
	return (
			<main>
				<Panel></Panel>
				<div className="cardContainer container">
					{cards.map((card) => (
							<Card
								key={card.id}
								name={card.name}
								description={card.description}
								img={images[card.type]}
								price={card.price}
								batches={card.batches}
							/>
					))}
				</div>
                
			</main>
	);
};

export default CatalogPage;
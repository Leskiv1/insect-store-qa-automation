import React from 'react';
import '../../../styled/viewSection.scss';
import Card from '../../generalComp/viewCard/ViewCard';
import ViewMore from "../../generalComp/SeeMore/SeeMore";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';

const cards = [
	{
		id: 1,
		name: 'Butterfly 1',
		type: 'butterfly',
		weight: 12,
		price: 2,
		description: 'Add a touch of elegance to your collection with this beautiful butterfly specimen! Vibrant colors, delicate details, and intricate patterns make it a stunning piece. Ideal for enthusiasts, nature lovers, or as a unique gift.'
	},
	{
		id: 2,
		name: 'Bee 1',
		type: 'bee',
		weight: 7,
		price: 1,
		description: 'Enhance your collection with this carefully preserved bee specimen! Showcasing fine details and natural beauty, it’s ideal for collectors, educators, or anyone intrigued by pollinators.'
	},
	{
		id: 3,
		name: 'Ladybag 1',
		type: 'ladybag',
		weight: 2,
		price: 3,
		description: 'Add a dash of luck to your collection with this beautifully preserved ladybug! Known for its vibrant red and iconic black spots, it’s perfect for collectors, educators, or nature lovers.'

	},
];

const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybag: ladybagImg,
};

const ViewSection = () => {
	return (
			<section className="view">
				<div className="container">
					<h1>Our insects</h1>
					<div className="cardContainer">
						{cards.map(({id, name, price, description, type}) => {
							return (
									<Card
										img={images[type]}
										name={name}
										key={id}
										price={price}
									>{description}</Card>
							)
						})}
					</div>
					<div className="buttonContainer">
						<ViewMore
								onClick={() => null}
						/>
					</div>
				</div>
			</section>
	);
};

export default ViewSection;
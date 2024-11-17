import React from 'react';
import './viewSection.scss';
import Card from '../../generalComp/viewCard/ViewCard';
import ViewMore from "../../generalComp/SeeMore/SeeMore";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';
import {useInsects} from '../../context/InsectsContext';

const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybug: ladybagImg,
};

const ViewSection = () => {
	const {insects} = useInsects()
	const [itemsCounter, setItemsCounter] = React.useState(3);
	return (
			<section className="view">
				<div className="container">
					<h1>Our insects</h1>
					<div className="cardContainer">
					{insects.slice(0, itemsCounter).map(({id, name,price, batches, description, type}) => {
							return (
									<Card
										img={images[type]}
										name={name}
										key={id}
										batches={batches}
										price={price}
									>{description}</Card>
							)
						})}
					</div>
					<div className="buttonContainer">
					{itemsCounter < insects.length && (
								<ViewMore
								onClick={() => setItemsCounter(prevState => prevState + 3)}
						/>
						)}
					</div>
				</div>
			</section>
	);
};

export default ViewSection;
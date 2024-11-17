import React, {useState} from 'react';
import './CatalogPage.scss';
import Panel from "../../catalogPageComp/panel/Panel";
import Card from "../../catalogPageComp/card/Card";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';
import { useInsects } from '../../context/InsectsContext';


const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybug: ladybagImg,
};

const CatalogPage = () => {
	const {insects} = useInsects();
	const [filteredInsects, setFilteredInsects] = useState(insects)
	return (
			<main className="catalogPage">
				<Panel
						insects={insects}
						setFilteredInsects={setFilteredInsects}
				/>

				<div className="cardContainer container">
					{filteredInsects.map((card) => (
							<Card
								key={card.id}
								id={card.id}
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
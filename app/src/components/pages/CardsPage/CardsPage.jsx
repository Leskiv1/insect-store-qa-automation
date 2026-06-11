import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import butterflyImg from '../../../assets/imgs/butterfly_2.png';
import beeImg from '../../../assets/imgs/bee.png';
import ladybagImg from '../../../assets/imgs/ladybag.png';
import {getInsectById} from "../../../assets/api/api";
import {useNavigate} from "react-router-dom";
import Button from '../../generalComp/button/Button';
import './CardsPage.scss';
import SelectSort from "../../catalogPageComp/panel/selectSort/SelectSort";
import IntInput from "../../generalComp/intInput/IntInput";
import {useDispatch} from "react-redux";
import {updateCount} from "../../../assets/store/cartSlice";

const yearOptions = new Map([
	['2024', '2024'],
	['2023', '2023'],
	['2022', '2022'],
]);

const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybug: ladybagImg,
};

const CardPage= () => {
	const {id} = useParams();
	const [insect, setInsect] = useState({});
	const navigate = useNavigate();
	const [yearOption, setYearOption] = useState('2024');
	const [count, setCount] = useState(1);
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			const insect = await getInsectById(id);
			setInsect(insect);
		}
		fetchData().then()
	}, [])

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
						<SelectSort
								value={yearOption}
								onChange={(e) => setYearOption(e.target.value)}
								labelText="Year of birth"
								sortName="year"
								options={yearOptions}
						/>
						<IntInput
								value={count}
								setValue={setCount}
						/>
					</div>
				</div>
				<div className="itemFooter">
					<span className="price">Price: {insect.price}$</span>
					<div className="buttons">
						 <Button onClick={async () => {
							 await dispatch(updateCount({
								 year: yearOption,
								 count,
								 insect_id: id,
							 }));
							 navigate('/cart')
						 }} additionalClass="itemButton">Add to shop</Button>
						<Button onClick={() => navigate(-1)}>Go back</Button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CardPage;
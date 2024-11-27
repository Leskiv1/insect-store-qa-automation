import React, {useState, useEffect} from 'react';
import SelectSort from "./selectSort/SelectSort";
import NameFind from "./nameFind/NameFind";
import Button from "../../generalComp/button/Button";
import './panel.scss';
import {getInsects} from "../../../assets/api/api";


const nameOptions = new Map([
	['not', 'not sort'],
	['a-z', 'a-z'],
	['z-a', 'z-a'],
]);

const batchesPriceOptions = new Map([
	['not', 'not sort'],
	['ascending', 'ascending'],
	['descending', 'descending'],
]);

const typeOptions = new Map([
	['all', 'all types'],
	['butterfly', 'butterfly'],
	['bee', 'bee'],
	['ladybug', 'ladybag'],
]);


const Panel = ({setFilteredInsects, setLoading}) => {
	const [nameSort, setNameSort] = useState(nameOptions.keys().next().value);
	const [batchesSort, setButchesSort] = useState(batchesPriceOptions
	.keys().next().value);
	const [priceSort, setPriceSort] = useState(batchesPriceOptions
	.keys().next().value);
	const [typeFilter, setTypeFilter] = useState(typeOptions.keys().next().value);
	const [nameFilter, setNameFilter] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const insects = await getInsects({
				nameSort,
				batchesSort,
				priceSort,
				nameFilter,
				typeFilter,
			});
			setFilteredInsects(insects);
			setLoading(false)
		}
		fetchData().then();
	}, [nameSort, batchesSort, priceSort, nameFilter, typeFilter]);


	const handleClear = () => {
		setNameFilter("");
		setNameSort(nameOptions.keys().next().value);
		setButchesSort(batchesPriceOptions.keys().next().value);
		setTypeFilter(typeOptions.keys().next().value);
		setPriceSort(batchesPriceOptions.keys().next().value);
	}

	return (
		<div className="panel">
			<div className="container">
				<div className="filters">
					<SelectSort
						value={nameSort}
						onChange={(e) => setNameSort(e.target.value)}
						labelText="Name sorting"
						sortName="name"
						options={nameOptions}
					/>
					<SelectSort
						value={batchesSort}
						onChange={(e) => setButchesSort(e.target.value)}
						labelText="Butches sorting"
						sortName="butches"
						options={batchesPriceOptions}
					/>
					<SelectSort
						value={priceSort}
						onChange={(e) => setPriceSort(e.target.value)}
						labelText="Price sorting"
						sortName="price"
						options={batchesPriceOptions}
					/>
					<SelectSort
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
						labelText="Type filter"
						sortName="type"
						options={typeOptions}
					/>
					<NameFind
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
					>Type name to find</NameFind>
					<div>
					<Button
						onClick={handleClear}
					>Clear</Button>
					</div>
				</div>
			</div>
		</div>
	);
};


export default Panel;

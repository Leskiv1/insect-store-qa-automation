import React, {useState, useEffect} from 'react';
import SelectSort from "./selectSort/SelectSort";
import NameFind from "./nameFind/NameFind";
import Button from "./button/Button";
import './panel.scss';


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


const Panel = ({setFilteredInsects, insects}) => {
	const [nameSort, setNameSort] = useState(nameOptions.keys().next().value);
	const [batchesSort, setButchesSort] = useState(batchesPriceOptions
	.keys().next().value);
	const [priceSort, setPriceSort] = useState(batchesPriceOptions
	.keys().next().value);
	const [typeFilter, setTypeFilter] = useState(typeOptions.keys().next().value);
	const [nameFilter, setNameFilter] = useState("");

	useEffect(() => {
		let filteredItems;

		filteredItems = insects.filter(insects => insects.name.toLowerCase().includes(nameFilter.toLowerCase().trim()));


	if (typeFilter !== 'all') {
		filteredItems = filteredItems.filter(insects => insects.type === typeFilter);
	}
	if (nameSort === 'a-z') {
		filteredItems.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
	} else if (nameSort === 'z-a') {
		filteredItems.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
	}
	if (batchesSort === 'ascending') {
        filteredItems.sort((a, b) => Number(a.batches) - Number(b.batches));
    } else if (batchesSort === 'descending') {
        filteredItems.sort((a, b) => Number(b.batches) - Number(a.batches));
    }

	if (priceSort === 'ascending') {
		filteredItems.sort((a, b) => +a.price - +b.price);
	} else if (priceSort === 'descending') {
		filteredItems.sort((a, b) => +b.price - +a.price);
	}

	setFilteredInsects(filteredItems);

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

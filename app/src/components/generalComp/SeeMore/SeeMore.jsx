import React from 'react';
import './SeeMore.scss';
import {
	ArrowRightOutlined
	 } from "@ant-design/icons";

const ViewMore = ({onClick, additionalClass = ''}) => {
	return (
			<button
					className={`viewMore ${additionalClass}`}
					onClick={onClick}
			>
				<span>See more                           <ArrowRightOutlined />
				</span>
			</button>
	);
};

export default ViewMore;
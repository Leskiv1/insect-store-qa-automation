import React from 'react';
import './HeroSection.scss';
import butterfly from '../../../assets/imgs/butterfly.png';


const HeroSection = () => {
	return (
			<section className="hero">
				<div className="container">
					<div className="information">
						<h2>Buy a little friend for your garden</h2>
						<h3>Here you can find not only beauty for your yard, but also health workers for your flowers</h3>
						<div>
							<p>50+<br />Insects species</p>
							<p1>|</p1>
							<p>100+<br />Customers</p>
						</div>
					</div>
					<img src={butterfly} alt="" />
				</div>
			</section>
	);
};

export default HeroSection;
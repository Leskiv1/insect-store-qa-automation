import React from 'react'
import '../../../styled/footer.scss';
import {
	InstagramOutlined,
	FacebookOutlined,
	TwitterOutlined,
	WechatOutlined
	 } from "@ant-design/icons";

const Footer = () => {
	return (
			<footer className="footer">
				<div className="container">
				<p>2023 all Right Reserved Term of use MyInsects</p>
				<span href="#">MyInsects</span>
					<nav>
						<a href="#"><InstagramOutlined /></a>
						<a href="#"><FacebookOutlined /></a>
						<a href="#"><TwitterOutlined /></a>
						<p>|</p>
						<a href="#"><WechatOutlined /></a>
					</nav>
				</div>
			</footer>
	);
};

export default Footer;
import React, {useEffect, useState} from 'react';
import './CartPage.scss';
import Cart from '../../cartPageComp/cart/Cart';
import {useSelector, useDispatch} from "react-redux";
import {fetchCarts, updateCount, removeCart} from "../../../assets/store/cartSlice";
import butterflyImg from "../../../assets/imgs/butterfly_2.png";
import beeImg from "../../../assets/imgs/bee.png";
import ladybagImg from "../../../assets/imgs/ladybag.png";

const images = {
	butterfly: butterflyImg,
	bee: beeImg,
	ladybug: ladybagImg,
};

const CartPage = () => {
	const dispatch = useDispatch();
	const {carts, loading, error} = useSelector((state) => state.cart);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		dispatch(fetchCarts());
	}, [dispatch]);

	useEffect(() => {
		const totalPrice = carts.reduce((acc, cart) => acc + (cart.insect.price * cart.count), 0)
		setTotalPrice(totalPrice);
	}, [carts]);

	return (
			<div className="cartPage">
				<div className="container">
					<h1>Shopping Cart</h1>
					<div className="items-container">
						{carts.map(cart => (
								<Cart
										img={images[cart.insect.type]}
										name={cart.insect.name}
										key={cart.id}
										price={cart.insect.price}
										count={cart.count}
										processing={cart.color}
										updateCount={(newCount) => dispatch(updateCount({
											insect_id: cart.insect.id,
											color: cart.color,
											count: newCount,
										}))}
										deleteCart={() => dispatch(removeCart(cart.id))}
								/>
						))}
					</div>
					<p className="totalPrice">
						Total price: {+totalPrice}$
					</p>
				</div>
			</div>
	);
};

export default CartPage;
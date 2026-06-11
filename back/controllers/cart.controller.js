import Cart from "../models/cart.model.js";
import {Sequelize} from "sequelize";
import Insect from "../models/insect.model.js";

class CartController {
	static async getCarts (req, res) {
		try {
			const carts = await Cart.findAll({
				attributes: ['id', 'count', 'year'],
				include: [
					{
						model: Insect,
						as: 'insect',
						required: true,
					},
				],
			});
			return res.json(carts);
		} catch (error) {
			console.error('Error fetching cart items:', error);
		}
	}

	static async deleteCart(req, res) {
		const {id} = req.params;
		try {
			const deleted = Cart.destroy({where: {id: id}});
			if (deleted) {
				return res.status(200).json({message: `Cart with id=${id} was deleted successfully`});
			}
		} catch (error) {
			console.log(`Error deleting cart ${id} - ${error}`);
		}
	}

	static async createOrUpdateCart(req, res) {
		const { insect_id, count, year } = req.body;

		try {
			const existingCart = await Cart.findOne({
				where: {
					insect_id,
					year,
				},
				include: [
					{
						model: Insect,
						as: 'insect',
					},
				],
			});

			if (existingCart) {
				existingCart.count = count;
				await existingCart.save();

				await existingCart.reload();

				return res.status(200).json({
					message: `Updated cart with insect_id=${insect_id} and year='${year}'.`,
					cart: {
						id: existingCart.id,
						count: existingCart.count,
						year: existingCart.year,
						insect: existingCart.insect,
					},
				});
			} else {
				const newCart = await Cart.create({
					insect_id,
					count,
					year,
				});

				const cartWithInsect = await Cart.findOne({
					where: { id: newCart.id },
					include: [
						{
							model: Insect,
							as: 'insect',
						},
					],
				});

				return res.status(201).json({
					message: "Created a new cart entry.",
					cart: {
						id: cartWithInsect.id,
						count: cartWithInsect.count,
						processing: cartWithInsect.year,
						insect: cartWithInsect.insect,
					},
				});
			}
		} catch (error) {
			console.error("Error in createOrUpdateCart:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	}

}

export default CartController;
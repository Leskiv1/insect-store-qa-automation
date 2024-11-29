import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Insect from "./insect.model.js";

const Cart = sequelize.define('Cart', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	insect_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'insect',
			key: 'id',
		},
	},
	count: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	year: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
}, {
	tableName: 'cart',
	timestamps: false,
});

Cart.belongsTo(Insect, { foreignKey: 'insect_id', as: 'insect' });

export default Cart;

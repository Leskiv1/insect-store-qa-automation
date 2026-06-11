import { DataTypes } from 'sequelize';
import sequelize from "../db.js";

const Insect = sequelize.define(
		'Insect',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			batches: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			tableName: 'insect',
			timestamps: false,
		}
);

export default Insect;

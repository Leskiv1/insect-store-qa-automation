import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const Insect = sequelize.define('Insect', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    speed: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    mass: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'insect',
    timestamps: false
});

export default Insect;

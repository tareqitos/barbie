const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Setups = sequelize.define('t_setups', {
  id_set: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_set: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 't_setups',
  timestamps: false
});

module.exports = Setups;

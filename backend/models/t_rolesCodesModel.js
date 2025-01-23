const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const RolesCodes = sequelize.define('t_rolescodes', {
  id_rol: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_rol: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 't_rolescodes',
  timestamps: false
});

module.exports = RolesCodes;
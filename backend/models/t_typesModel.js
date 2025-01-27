const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Types = sequelize.define('t_types', {
  id_typ: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_typ: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 't_types',
  timestamps: false
});

module.exports = Types;

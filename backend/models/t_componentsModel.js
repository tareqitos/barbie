const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Components = sequelize.define('t_components', {
  id_comp: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  serial_comp: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  fktypes_comp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_types',
      key: 'id_typ',
    }
  }
}, {
  tableName: 't_components',
  timestamps: false
});

module.exports = Components;
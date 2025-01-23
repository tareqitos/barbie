const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Pictures = sequelize.define('t_pictures', {
  id_pic: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_pic: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 't_pictures',
  timestamps: false
});

module.exports = Pictures;

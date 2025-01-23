const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Games = sequelize.define('t_games', {
  id_gam: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_gam: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  pic_gam: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 't_games',
  timestamps: false
});

module.exports = Games;
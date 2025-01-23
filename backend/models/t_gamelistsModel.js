const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const GameLists = sequelize.define('t_gamelists', {
  fkusers_gam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_users',
      key: 'id_use',
    }
  },
  fkgames_gam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_games',
      key: 'id_gam',
    }
  },
  name_gam: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 't_gamelists',
  timestamps: false
});

module.exports = GameLists;
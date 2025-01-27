const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ListSetups = sequelize.define('t_listsetups', {
  fkusers_listset: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_users',
      key: 'id_use',
    }
  },
  fksetups_listset: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_setups',
      key: 'id_set',
    }
  }
}, {
  tableName: 't_listsetups',
  timestamps: false
});

module.exports = ListSetups;

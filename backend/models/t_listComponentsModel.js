const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ListComponents = sequelize.define('t_listcomponents', {
  fksetups_listcomp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_setups',
      key: 'id_set',
    }
  },
  fkcomponents_listcomp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_components',
      key: 'id_comp',
    }
  }
}, {
  tableName: 't_listcomponents',
  timestamps: false
});

module.exports = ListComponents;
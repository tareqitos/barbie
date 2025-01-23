const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Roles = sequelize.define('t_roles', {
  fkusers_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 't_users',
      key: 'id_use',
    }
  },
  fkrolescodes_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 't_rolescodes',
      key: 'id_rol',
    }
  }
}, {
  tableName: 't_roles',
  timestamps: false
});

module.exports = Roles;

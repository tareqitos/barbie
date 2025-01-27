const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Roles = require('./t_rolesModel');

const Users = sequelize.define('t_users', {
  id_use: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email_use: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  username_use: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  passwd_use: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token_use: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
}, {
  tableName: 't_users',
  timestamps: false,
});

Users.hasMany(Roles, {
  foreignKey: 'fkusers_rol',
  as: 'roles',
});
Roles.belongsTo(Users, {
  foreignKey: 'fkusers_rol',
  as: 'user',
});

module.exports = Users;
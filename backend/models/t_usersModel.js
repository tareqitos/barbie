const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

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
  },
}, {
  tableName: 't_users',
  timestamps: false
});

module.exports = Users;
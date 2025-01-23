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
    defaultValue: '0',
  },
  // fkpictures_use: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: 1,
  //   references: {
  //     model: 't_pictures',
  //     key: 'id_pic',
  //   }
  // }
}, {
  tableName: 't_users',
  timestamps: false
});

module.exports = Users;
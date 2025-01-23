const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Comments = sequelize.define('t_comments', {
  id_comm: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text_comm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_comm: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  fkusers_comm: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_users',
      key: 'id_use',
    }
  },
  fkgames_comm: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 't_games',
      key: 'id_gam',
    }
  }
}, {
  tableName: 't_comments',
  timestamps: false
});

module.exports = Comments;  
const sequelize = require('./connection');
const RolesCodes = require('../models/t_rolesCodesModel');
const Setups = require('../models/t_setupsModel');
//const Pictures = require('../models/t_picturesModel');
const Games = require('../models/t_gamesModel');
const Types = require('../models/t_typesModel');
const Components = require('../models/t_componentsModel');
const Users = require('../models/t_usersModel');
const Roles = require('../models/t_rolesModel');
const Comments = require('../models/t_commentsModel');
const ListSetups = require('../models/t_listSetupsModel');
const ListComponents = require('../models/t_listComponentsModel');
const GameLists = require('../models/t_gameListsModel');

// Define associations
Users.hasMany(Roles, { foreignKey: 'fkusers_rol' });
Roles.belongsTo(Users, { foreignKey: 'fkusers_rol' });

RolesCodes.hasMany(Roles, { foreignKey: 'fkrolescodes_rol' });
Roles.belongsTo(RolesCodes, { foreignKey: 'fkrolescodes_rol' });

// Pictures.hasMany(Users, { foreignKey: 'fkpictures_use' });
// Users.belongsTo(Pictures, { foreignKey: 'fkpictures_use' });

Types.hasMany(Components, { foreignKey: 'fktypes_comp' });
Components.belongsTo(Types, { foreignKey: 'fktypes_comp' });

Users.hasMany(Comments, { foreignKey: 'fkusers_comm' });
Comments.belongsTo(Users, { foreignKey: 'fkusers_comm' });

Games.hasMany(Comments, { foreignKey: 'fkgames_comm' });
Comments.belongsTo(Games, { foreignKey: 'fkgames_comm' });

Users.belongsToMany(Setups, { through: ListSetups, foreignKey: 'fkusers_listset' });
Setups.belongsToMany(Users, { through: ListSetups, foreignKey: 'fksetups_listset' });

Setups.belongsToMany(Components, { through: ListComponents, foreignKey: 'fksetups_listcomp' });
Components.belongsToMany(Setups, { through: ListComponents, foreignKey: 'fkcomponents_listcomp' });

Users.belongsToMany(Games, { through: GameLists, foreignKey: 'fkusers_gam' });
Games.belongsToMany(Users, { through: GameLists, foreignKey: 'fkgames_gam' });

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); 
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
}

syncDatabase();

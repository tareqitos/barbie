const RolesCodes = require('../../models/t_rolesCodesModel');
const Pictures = require('../../models/t_picturesModel');
const Games = require('../../models/t_gamesModel');
const Types = require('../../models/t_typesModel');
const Components = require('../../models/t_componentsModel');
const Users = require('../../models/t_usersModel');
const Roles = require('../../models/t_rolesModel');

async function seedDatabase() {
  try {
    // Insert RolesCodes
    await RolesCodes.bulkCreate([
      { name_rol: 'admin' },
      { name_rol: 'user' }
    ]);

    // Insert Pictures
    // await Pictures.bulkCreate([
    //   { name_pic: '/PATH/PICTURE_1.jpg' },
    //   { name_pic: '/PATH/PICTURE_2.jpg' },
    //   { name_pic: '/PATH/PICTURE_3.jpg' },
    //   { name_pic: '/PATH/PICTURE_4.jpg' }
    // ]);

    // Insert Games
    await Games.bulkCreate([
      { name_gam: 'GTA5', pic_gam: '/PATH/PICTURE_GTA5.jpg' },
      { name_gam: 'Counter Strike', pic_gam: '/PATH/PICTURE_CS.jpg' }
    ]);

    // Insert Types
    await Types.bulkCreate([
      { name_typ: 'CPU' },
      { name_typ: 'GPU' },
      { name_typ: 'RAM' }
    ]);

    // Insert Components
    await Components.bulkCreate([
      { serial_comp: 'i54433S', fktypes_comp: 1 },
      { serial_comp: 'rx5000', fktypes_comp: 2 },
      { serial_comp: 'DDR-333', fktypes_comp: 3 },
      { serial_comp: 'i74770S', fktypes_comp: 1 }
    ]);

    // Insert Users
    await Users.bulkCreate([
      { email_use: 'admin@admin.com', username_use: 'admin', passwd_use: 'admin', token_use: '0' },
      { email_use: 'user@user.com', username_use: 'user', passwd_use: 'user', token_use: '0' }
    ]);

    // Insert Roles
    await Roles.bulkCreate([
      { fkusers_rol: 1, fkrolescodes_rol: 1 },
      { fkusers_rol: 1, fkrolescodes_rol: 2 },
      { fkusers_rol: 2, fkrolescodes_rol: 2 }
    ]);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

module.exports = seedDatabase;

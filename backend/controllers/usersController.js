const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const { Op } = Sequelize;
const Users = require('../models/t_usersModel');
const Roles = require('../models/t_rolesModel');
const RolesCodes = require('../models/t_rolescodesModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
          attributes: ['id_use', 'email_use', 'username_use'], 
          include: [
            {
              model: Roles,
              as: 'roles',
              include: [
                {
                  model: RolesCodes,
                  as: 'roleCode',
                  attributes: ['name_rol'], 
                },
              ],
            },
          ],
          order: [['id_use', 'DESC']], 
        });
        const userList = users.map((user) => ({
          id: user.id_use,
          email: user.email_use,
          username: user.username_use,
          level: user.roles.map((role) => role.roleCode.name_rol).join(', '), 
        }));
            res.status(200).json(userList);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch users' });
      }
}

const createNewUser = async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'email, username and password are required'})
    }
    try {
        const duplicate = await Users.findOne({ 
            where: { 
                [Op.or]: [ 
                    { email_use: email }, 
                    { username_use: username } 
                ] 
            } 
        })
        if (duplicate) {
            return res.status(409).json({ 
                message: 'Username or email already exists' 
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            email_use: email,
            username_use: username,
            passwd_use: hashedPassword,
        });
        await Roles.create({
            fkusers_rol: newUser.id_use,
            fkrolescodes_rol: 2,
        });
        res.status(200).json({ message: 'New user created successfully'})
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

// TODO
const updateUser = (req, res) => {
    res.json({
        "username": req.body.username
    })
}

const deleteUser = async (req, res) => {
    const userId = req.body.id
    try {
        const user = await Users.findOne({ 
            where: { 
                id_use: userId 
            } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.sendStatus(200)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

const getUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await Users.findOne({
            where: { id_use: userId },
            attributes: ['id_use', 'email_use', 'username_use'],
            include: [
              {
                model: Roles,
                as: 'roles',
                include: [
                  {
                    model: RolesCodes,
                    as: 'roleCode',
                    attributes: ['name_rol'], 
                  },
                ],
              },
            ],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = {
            id: user.id_use,
            email: user.email_use,
            username: user.username_use,
            level: user.roles.map((role) => role.roleCode.name_rol),
        };
        res.status(200).json(userData)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
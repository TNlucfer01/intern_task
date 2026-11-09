const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const toPublicUser = (user) => {
  const { password, ...publicUser } = user.get({ plain: true });
  return publicUser;
};

const getUserbyId = async (userId) => {
  try {
    const user = await User.findByPk(userId,{attributes: { exclude: ['password'] }});
    return user;
  } catch (err) {
    throw err;
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
    return user;
  } catch (err) {
    throw err;
  }
};

const getallUsers = async () => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  } catch (err) {
    throw err;
  }
};

const createUser = async (userData) => {
  try {
    const data = userData && typeof userData === "object" ? userData : {};
    if (typeof data.password !== "string" || data.password.length === 0) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      role: data.role,
      title: data.title,
          assigned_department: data.assigned_department,                                                 
    });
    return toPublicUser(user);
  } catch (err) {
    throw err;
  }
};

const updateUserid = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const data = userData && typeof userData === "object" ? userData : {};
    const updates = {};
    for (const field of ["name", "email", "role", "title", "assigned_department"]) {                     if (data[field] !== undefined) {
        updates[field] = data[field];
      }
    }
   
    await user.update(updates);
    return toPublicUser(user);
  } catch (err) {
    throw err;
  }
};

const deleteUserbyId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getUserbyId,
  getUserByEmail,
  getallUsers,
  createUser,
  updateUserid ,
  deleteUserbyId
};

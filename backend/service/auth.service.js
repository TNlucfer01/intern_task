const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "employee",
  });
  

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

const authMe = async (userId) => {
  return User.findByPk(userId, {
    attributes: ["id", "name", "email"],
  });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}
  const token = jwt.sign(
    { id: user.id, email: user.email ,role:user.role},
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
  authMe
};

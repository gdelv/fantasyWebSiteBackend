const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 11;
const TOKEN_KEY = "fantasykey";

const join = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password, email, firstName, lastName } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      userName,
      email,
      firstName,
      lastName,
      password_digest
    });
    console.log(user);
    const payload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log("Oops! Something went wrong");
    return res.status(400).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
    try {
        console.log(req.body)
        const { userName, password } = req.body
        const user = await User.findOne({
            where: {
                userName
            }
        })
        console.log(user.dataValues)
        if(await bcrypt.compare(password, user.dataValues.password_digest)) {
            const payload = {
                id:user.id,
                userName: user.userName,
                email: user.email
            }
            const token = jwt.sign(payload, TOKEN_KEY)
            return res.status(201).json({ user, token })
        }
         else {
            res.status(401).send('Invalid Login')
        }

} catch(error) {
    return res.status(500).json({ error:error.message })
}
}



const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    return res.status(201).json({
      user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id }
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exist");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(204).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  join,
  logIn
};

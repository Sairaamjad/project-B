const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
SECRET_KEY = "saira";
const db = require("../models/index.js");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, isAdmin } = req.body;
    const existingUser = await db.User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.User.create({
      fullName,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const result = {
      user: user.get(),
    };

    // Create JWT token only when creating a user
    const token = jwt.sign(
      {
        email: result.user.email,
        isAdmin: result.user.isAdmin,
        id: result.user.id,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Send the response
    res.status(201).json({ result, token });
  } catch (err) {
    console.log(err);
    // Send an error response
    res.status(500).json({ message: "Something went wrong: " + err });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (existingUser) {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (matchPassword) {
        const token = jwt.sign(
          {
            email: existingUser.email,
            id: existingUser.id,
            isAdmin: existingUser.isAdmin,
          },
          SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.status(200).json({ user: existingUser.get(), token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" + err });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" + err });
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong" + err,
    });
  }
};

const userDel = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Now, delete the user
    await db.User.destroy({ where: { id } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" + err });
  }
};

const userUpdate = async (req, res) => {
  const {  fullName} = req.body;
  const id = req.params.id;
  const updateUser = {
  fullName
  };
  try {
    console.log(`Attempting to update user with ID: ${id}`);

    // Find the user
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      console.log(`User with ID ${id} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user
    await user.update(updateUser);

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" + err });
  }
};

module.exports = { signUp, signIn, getAll, getOne, userDel, userUpdate };

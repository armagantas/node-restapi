const auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { find } = require("../models/auth.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await auth.findOne({ email });

    if (user) {
      return res.status(500).json({
        message: "This e-mail address is using from another user!",
      });
    }

    if (password.length < 6) {
      return res.status(500).json({
        message: "Password has to be at least six characters!",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await auth.create({
      username,
      email,
      password: passwordHash,
    });

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await auth.findOne({ email });

    if (!user) {
      return res.status(500).json({
        message: "There is no user!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(500).json({
        message: "Password is wrong!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };

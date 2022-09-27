const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { isEmail, validateLength } = require("../helpers/validator");
const { hashPassword } = require("../helpers/encrypt");
const { generateUsername } = require("../helpers/generate");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      gender,
      birth_year,
      birth_day,
      birth_month,
      email,
      password,
    } = req.body;

    if (!isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address!" });
    }

    if (!validateLength(first_name, 2, 30)) {
      return res
        .status(400)
        .json({ message: "First name must be between 2-30 characters long!" });
    }
    if (!validateLength(last_name, 2, 30)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 2-30 characters long!" });
    }

    if (!validateLength(password, 8, 32)) {
      return res
        .status(400)
        .json({ message: "Password must be between 8-32 characters long!" });
    }

    const encryptedPassword = await hashPassword(password);
    const existingUsername = await User.findOne({ username });
    let generatedUsername = username;

    if (existingUsername) {
      generatedUsername = await generateUsername(
        first_name.toLowerCase() + last_name.toLowerCase()
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    const user = await new User({
      first_name,
      last_name,
      username: generatedUsername,
      gender,
      birth_year,
      birth_day,
      birth_month,
      email,
      password: encryptedPassword,
    }).save();

    const emailVerificationToken = generateToken({ id: user._id }, "30m");
    const token = generateToken({ id: user._id.toString() }, "7d");
    const emailActivationUrl = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // await sendVerificationEmail(
    //   newUser.email,
    //   newUser.first_name,
    //   emailActivationUrl
    // );
    res.status(201).json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      emailActivationUrl,
      verified: user.verified,
      message: "Registration Successful! Activate your email.",
    });
  } catch (error) {
    res.status(500).json({ messasge: "Something went wrong!" });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const {token} = req.params;
    const user = jwt.verify(token, process.env.JWT_SECRECT);
  
    if(!user) {
      return res.status(400).json({message: "Invalid token"});
    }
    const userData = await User.findById(user.id)
    if(userData.verified) {
      return res.status(400).json({message: "User is already verified!"});
    } else {
      await User.findByIdAndUpdate(user.id, {verified: true})
      return res.status(200).json({message: "Email verified!"})
    }
  } catch (error) {
    res.status(500).json({message: "Something went wrong!"})
  }
}

exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
      return res.status(404).json({message: "Email is not registered!"});
    }
    const matchPass = await bcrypt.compare(password, user.hashPassword);
    if(!matchPass) {
      return res.status(400).json({message: "Incorrect Password!"});
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.status(201).json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message: "Login Successful!",
    });
  } catch (error) {
    res.status(500).json({message: "Something went wrong!"})
  }
}
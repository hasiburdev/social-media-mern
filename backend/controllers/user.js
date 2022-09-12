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
    console.log(req.body);

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
    console.log(encryptedPassword);

    const existingUsername = await User.findOne({ username });
    let generatedUsername = username;

    if (existingUsername) {
      generatedUsername = await generateUsername(
        first_name.toLowerCase() + last_name.toLowerCase()
      );
      console.log(generatedUsername);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    const user = new User({
      first_name,
      last_name,
      username: generatedUsername,
      gender,
      birth_year,
      birth_day,
      birth_month,
      email,
      password: encryptedPassword,
    });

    const newUser = await user.save();
    const emailVerificationToken = generateToken({ id: newUser._id }, "30m");
    const emailActivationUrl = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(
      newUser.email,
      newUser.first_name,
      emailActivationUrl
    );
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messasge: "Something went wrong!" });
  }
};

const User = require("../models/User");

exports.createUser = async (req, res) => {
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

  try {
    const user = new User({
      first_name,
      last_name,
      username,
      gender,
      birth_year,
      birth_day,
      birth_month,
      email,
      password,
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json({ messasge: "Something went wrong!" });
  }
};

const User = require("../models/User");
exports.generateUsername = async (username) => {
  while (true) {
    const user = await User.findOne({ username });
    if (user) {
      username += (Math.random() * 100).toString().substring(0, 3);
      continue;
    }
    if (!user) {
      return username;
    }
  }
};

const bcrypt = require("bcrypt");

/**
 * Encrypt password.
 * @param {string} plainPassword The user provided password.
 * @param {number} saltRound Number of salt rounds.
 * @returns {string}
 */

exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, +process.env.SALT_ROUND);
};

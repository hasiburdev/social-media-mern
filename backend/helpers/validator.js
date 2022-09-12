/**
 * Checks if an email is valid or not.
 * @param {string} email Email to validate.
 * @returns {boolean}
 */

exports.isEmail = (email) => {
  return String(email)
    .toLocaleLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
/**
 * Validates length of input.
 * @param {string} str Input String
 * @param {number} min Minimum Length
 * @param {number} max Maximum Length
 * @returns {boolean}
 */
exports.validateLength = (str, min, max) => {
  if (str.length < min || str.length > max) {
    return false;
  }
  return true;
};

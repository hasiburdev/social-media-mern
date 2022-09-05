const express = require("express");
const { createUser } = require("../controllers/user");

const router = express.Router();

router
  .route("/register")
  .get((req, res) => {
    res.send("hey, user");
  })
  .post(createUser);

module.exports = router;

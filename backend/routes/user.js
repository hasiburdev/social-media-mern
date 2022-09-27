const express = require("express");
const { createUser, activateUser } = require("../controllers/user");

const router = express.Router();

router
  .route("/register")
  .get((req, res) => {
    res.send("hey, user");
  })
  .post(createUser);
router.get('/activate/:token',activateUser);

module.exports = router;

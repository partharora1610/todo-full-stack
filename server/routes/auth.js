const express = require("express");

const {
  loginHandler,
  signupHandler,
  refreshHandler,
} = require("../controllers/auth");

const router = express.Router();

router.post("/login", loginHandler);

router.post("/refresh", refreshHandler);

router.post("/signup", signupHandler);

module.exports = router;

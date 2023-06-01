var express = require("express");
var router = express.Router();
const userCtrl = require("../../controllers/userCtrl");
const authentication = require("../../controllers/middleware/authentication");
const Users = require("../../db/models/")["users"];

// signup
router.post("/sign-up", userCtrl.signUp);

// delete
router.delete("/delete-user", userCtrl.deleteUser);

// login
router.post("/login", userCtrl.login);

// fetch user
router.get("/login", authentication, userCtrl.getUser);

// signup

router.post("/sign-out", userCtrl.signOut);

//fetch all users
router.get("/all-users", userCtrl.getAllUsers);

module.exports = router;

const {getUsers,getUser,createUser,updateUser,deleteUser} = require("../controllers/user");
const router = require("express").Router();

router.get("/", getUsers); // /users
router.get("/:userId", getUser); // /users/:userId
router.post("/", createUser); // /users
router.put("/:userId", updateUser); // /users/:userId
router.delete("/:userId", deleteUser); // /users/:userId

module.exports = router;

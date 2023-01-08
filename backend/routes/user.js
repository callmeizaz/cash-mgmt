const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/jwtAuth");

router.get("", auth, userController.getAllUsers);
router.post("/register", userController.registerUser);
router.post("/refreshToken", userController.useRefreshToken);
router.post("/login", userController.login);
router.delete("/delete", userController.delete);
router.post("/tokenIsValid", userController.isTokenValid);
router.get("/:id", userController.getUserById);

module.exports = router;

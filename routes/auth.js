const express = require("express");
const { check } = require("express-validator/check");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.get("/reset", authController.getReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/login", authController.postLogin);

// store the errors in an object
router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      if (value === "test@test.com") {
        throw new Error("This email address is fobidden.");
      }
      return true;
    }),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.post("/reset", authController.postReset);

router.post("/new-password", authController.postNewPassword);

module.exports = router;

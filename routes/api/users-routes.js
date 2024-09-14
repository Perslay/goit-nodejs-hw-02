const express = require("express");
const ctrlUser = require("../../controller/users-controller");
const { upload } = require("../../middlewares/upload");
const router = express.Router();

router.post("/signup", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.get("/logout", ctrlUser.auth, ctrlUser.logout);
router.get("/current", ctrlUser.auth, ctrlUser.current);
router.patch("/", ctrlUser.auth, ctrlUser.updateSub);
router.patch(
  "/avatars",
  ctrlUser.auth,
  (req, res, next) => {
    console.log("Middleware reached: Uploading avatar");
    upload.single("avatar")(req, res, next);
  },
  ctrlUser.updateAvatar
);

module.exports = router;

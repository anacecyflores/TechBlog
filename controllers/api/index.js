const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentsRoutes = require("./commentsRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;

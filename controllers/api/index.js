const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentsRoutes = require("./commentsRoutes");
const postsRoutes = require("./postsRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentsRoutes);
router.use("/posts", postsRoutes);

module.exports = router;

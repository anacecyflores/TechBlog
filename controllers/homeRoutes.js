const router = require("express").Router();
const { Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   try {
//     // Get all comments and JOIN with user data
//     const commentData = await Comment.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const comments = commentData.map((comment) => comment.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render("homepage", {
//       comments,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/comments/:id", async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const comment = commentData.get({ plain: true });

//     res.render("comments", {
//       ...comment,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Comment }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("comments", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/login", (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect("about");
//     return;
//   }

//   res.render("login");
// });

router.get("/about", (req, res) => res.render("about"));
router.get("/blog", (req, res) => res.render("blog"));
router.get("/contact", (req, res) => res.render("contact"));
router.get("/home", (req, res) => res.render("home"));
router.get("/portfolio-overview", (req, res) =>
  res.render("portfolio-overview")
);
module.exports = router;
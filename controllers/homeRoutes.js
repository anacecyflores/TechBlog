const router = require("express").Router();
const { Comment, User, Post } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/blog", (req, res) => res.render("blog"));

router.get("/blog", async (req, res) => {
  try {
    const blogData = await Post.findAll({
      attributes: ["id", "user_id", "title", "post_content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_content", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const posts = blogData.map((post) => post.get({ plain: true }));

    res.render("blog", {
      posts,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//-------------individual posts--------------------
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "user_id", "title", "post_content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("posts", {
      ...post,
      logged_in: req.session.logged_in,
      user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//-------------individual posts end--------------------

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

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("about");
    return;
  }

  res.render("login");
});

router.get("/about", (req, res) => res.render("about"));
// router.get("/blog", (req, res) => res.render("blog"));
router.get("/contact", (req, res) => res.render("contact"));
router.get("/home", (req, res) => res.render("home"));
router.get("/portfolio-overview", (req, res) =>
  res.render("portfolio-overview")
);
module.exports = router;

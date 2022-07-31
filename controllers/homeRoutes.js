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
      logged_in: req.session.logged_in,
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

    const posts = postData.get({ plain: true });

    res.render("posts", {
      ...posts,
      logged_in: req.session.logged_in,
      user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//-------------individual posts end--------------------

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("about");
    return;
  }

  res.render("login");
});

module.exports = router;

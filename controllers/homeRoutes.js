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

router.get("/", (req, res) => {
  res.render("home", {
    logged_in: req.session.logged_in,
  });
});

router.get("/home", (req, res) => {
  res.render("home", {
    logged_in: req.session.logged_in,
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    logged_in: req.session.logged_in,
  });
});
router.get("/portfolio-overview", (req, res) => {
  res.render("portfolio-overview", {
    logged_in: req.session.logged_in,
  });
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
  res.render("login");
});

module.exports = router;

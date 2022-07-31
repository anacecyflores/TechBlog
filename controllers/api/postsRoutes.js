const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  console.log(req, res);

  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((newPost) => res.json(newPost))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;

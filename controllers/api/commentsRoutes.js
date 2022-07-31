const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  Comment.create({
    comment_content: req.body.commentContent,
    post_id: req.body.postId,
    user_id: req.session.user_id,
  })
    .then((cData) => res.json(cData))

    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentsData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentsData) {
      res.status(404).json({ message: "No comment found!" });
      return;
    }

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

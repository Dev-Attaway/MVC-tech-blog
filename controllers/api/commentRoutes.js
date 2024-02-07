const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    const comment = newComment.get({
      plain: true,
    });
    console.log(comment);
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

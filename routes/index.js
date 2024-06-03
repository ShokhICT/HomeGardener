
const express = require("express");

const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/post-detail/:id", postController.getPostById);
router.get("/create", (req, res) => {
    res.render("create");
});
router.post("/create", postController.createPost);
router.get("/edit/:id", postController.editPost);
router.post("/edit/:id", postController.updatePost);
router.get("/delete/:id", postController.deletePost);

module.exports = router;

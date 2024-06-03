const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
});

const Post = mongoose.model("Post", postSchema);

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.render("index", { posts: posts });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).send("Server Error");
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("postDetail", { post: post });
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).send("Server Error");
    }
};

exports.createPost = async (req, res) => {
};

exports.updatePost = async (req, res) => {
};

exports.deletePost = async (req, res) => {
    app.get("/delete/:id", async (req, res) => {
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.redirect("/");
        } catch (err) {
            console.error("Error deleting post:", err);
            res.status(500).send("Server Error");
        }
    });
};

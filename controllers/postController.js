const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
    author: { type: String, required: true },
    title: { type: String, required: true },
    plantsType: {
        type: String,
        enum: ["flowers", "vegetables", "fruits", "herbs"],
        required: true,
    },
    plantsVariety: { type: String, required: true },
    plantsImage: { type: String, required: true },
    description: { type: String, required: true },
});

const postController = {};

postController.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.render("index", { posts });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).send("Server Error");
    }
};

postController.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("post-detail", { post });
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).send("Server Error");
    }
};

postController.createPost = async (req, res) => {
    try {
        const { author, title, plantsType, plantsVariety, description } = req.body;
        const fileUrl =
            req.protocol + "://" + req.get("host") + "/" + req.file.path;
        const post = new Post({
            author,
            title,
            plantsType,
            plantsVariety,
            plantsImage: fileUrl,
            description,
        });
        await post.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).send("Server Error");
    }
};

postController.editPost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/");
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Server Error");
    }
};

postController.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).send("Server Error");
    }
};

module.exports = postController;

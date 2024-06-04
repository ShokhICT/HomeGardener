const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
//const app = express();
//const port = 3000;
const express = require('express');
const app = express();
const nodeEnv = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;


mongoose
    .connect(
        "mongodb+srv://ermsho:3291929Shoh@homegardener.qkfaz6c.mongodb.net/your-database-name", // replace `your-database-name` with the actual database name
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        }
    )
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("Error:", err));

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    plantsType: {
        type: String,
        enum: ["flowers", "vegetables", "fruits", "herbs"],
        required: true,
    },
    plantDate: { type: Date, required: true },
    plantLocation: { type: String, required: true },
    plantsVariety: { type: String, required: true },
    plantsImage: { type: String, required: true },
    description: { type: String, required: true },
});
const Post = mongoose.model("Post", postSchema);

app.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.render("index", { posts: posts });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/post-detail/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("post-detail", { post: post });
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", upload.single("plantsImage"), async (req, res) => {
    try {
        const { author, title, plantsType, plantLocation, plantsVariety, plantDate, description } = req.body;
        const post = new Post({
            author,
            title,
            plantsType,
            plantsVariety,
            plantLocation,
            plantsImage: req.file.filename,
            description,
            plantDate,
        });
        await post.save();
        res.redirect("/");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
});

app.get("/edit/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("edit", { post: post });
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).send("Server Error");
    }
});

app.post("/edit/:id", upload.single("plantsImage"), async (req, res) => {
    try {
        const { author, title, plantsType, plantLocation, plantsVariety, plantDate, description } = req.body;
        const updateData = {
            author,
            title,
            plantsType,
            plantLocation,
            plantsVariety,
            description,
            plantDate,
        };

        if (req.file) {
            updateData.plantsImage = req.file.filename;
        }

        await Post.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/");
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

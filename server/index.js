import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
dotenv.config();

// Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// this is how we're gonna save files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 6001;

let isShuttingDown = false;

mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        await mongoose.connection.db.dropDatabase();
        app.listen(PORT, () => console.log(`Server Port ${PORT}`));
        await User.insertMany(users);
        await Post.insertMany(posts);
        console.log("Sample Data Injected");

        const shutdown = async () => {
            if (isShuttingDown) return;
            isShuttingDown = true;

            console.log("\nShutting down, dropping database...");
            await mongoose.connection.db.dropDatabase();
            console.log("Database dropped.");
            process.exit(0);
        };

        // Ctrl+C
        process.on("SIGINT", shutdown);
        // process kill
        process.on("SIGTERM", shutdown);
        // Nodemon restart
        process.on("SIGUSR2", async () => {
            await shutdown();
            process.kill(process.pid, "SIGUSR2");
        });
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });

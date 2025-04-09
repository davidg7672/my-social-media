import Post from "../models/Post.js";
import User from "../models/User.js";

/**
 * @function createPost
 * ---------------------
 * Creates a new post from user input.
 * - Retrieves user data to include name, location, and profile picture.
 * - Initializes likes and comments as empty objects.
 * - Returns all posts after saving the new one.
 */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: {},
        });

        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/**
 * @function getFeedPosts
 * -----------------------
 * Retrieves all posts in the database (used for main feed).
 */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(Post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * @function getUserPosts
 * -----------------------
 * Retrieves all posts created by a specific user.
 * - `userId` is extracted from the request URL params.
 */
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * @function likePost
 * -------------------
 * Toggles the like status of a post for a given user.
 * - Adds userId to the `likes` map if not liked.
 * - Removes userId if already liked.
 * - Returns the updated post.
 */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                likes: post.likes,
            },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

/**
 * PostsWidget component
 *
 * Displays a list of posts, either all posts or just those from a specific user,
 * depending on whether `isProfile` is true.
 *
 * - On initial render, it fetches the appropriate set of posts from the backend.
 * - Uses Redux to manage and retrieve posts from global state.
 */
const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.auth.posts);
    const token = useSelector((state) => state.auth.state);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;

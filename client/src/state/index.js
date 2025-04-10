import { createSlice } from "@reduxjs/toolkit";

// initial state of teh auth state
const initialState = {
    mode: "light", // light mode
    user: null, // logged in user object
    token: null, // auth token
    posts: [], // array to hold the posts
};

// creating a slice fo reduce state for authentication and app-level info
export const authSlice = createSlice({
    // slice name
    name: "auth",
    initialState,

    // reducers used to handle changes to teh state based on dispatched actions
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends non-existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    authSlice.actions;
export default authSlice.reducer;

import User from "../models/User.js";

/**
 * @function getUser
 * -----------------
 * Retrieves a user by their ID.
 * - ID is pulled from the request URL parameters.
 * - Returns the full user document.
 */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * @function getUserFriends
 * ------------------------
 * Retrieves a user's friends as a list of user objects.
 * - Gets the user by ID and loads each friend by ID.
 * - Returns a formatted list of friend info (without sensitive data).
 */
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * @function addRemoveFriend
 * -------------------------
 * Adds or removes a friend relationship between two users.
 * - If `friendId` already exists in user's friends, it is removed (and vice versa).
 * - Otherwise, both users are added to each other's friends list.
 * - Returns the updated friend list for the user.
 */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = user.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

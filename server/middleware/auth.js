import jwt from "jsonwebtoken";

/**
 * Verifies the JWT token from the request header for authentication.
 */
export const verifyToken = async (req, res, next) => {
    try {
        // getting token from authorization header
        let token = req.header("Authorization");

        //  access denied if no token is present
        if (!token) {
            return res.status(403).send("Access denied");
        }

        // removing 'Bearer ' if it's present.
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

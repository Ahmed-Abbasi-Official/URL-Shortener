import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || "Ahmed@12"; // Move to environment variable

function setUser(user) {
   return jwt.sign(user, secret);
}


function getUser(token) {
    try {
        if (!token) {
            throw new Error("Token is not provided");
        }
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('Invalid token:', err.message);
        return null; // Handle invalid tokens
    }
}

export { getUser, setUser };

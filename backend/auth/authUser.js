import jwt from "jsonwebtoken";

const SECRET_KEY = 'amIsraelHai555';

export const generateToken = (user) => {
    return jwt.sign({ userEmail: user.email, userPassword: user.password }, SECRET_KEY, { expiresIn: '1h' })
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ message: 'Token not found. You need to login.'});
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Invalid token.'});
        }

        req.user = decoded;
        next();
    });
};
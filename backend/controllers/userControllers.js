import { generateToken } from "../auth/authUser.js";
import bcrypt from 'bcrypt';

// Array to temporarily store users
let users = [];

// Controller to get all users
export const getAllUsers = (req, res) => {
    const usersWithoutSensitiveInfo = users.map(({ name, email }) => ({ name, email }));

    res.json(usersWithoutSensitiveInfo);
};

// Controller to create a new user
export const createUser = async (req, res) => {
  const { name, email, tel, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = {
    name,
    email,
    tel,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// Controller to LogIn a user 
export const logIn = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email."});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Wrong password.'});
    }

    const token = generateToken(user);

    res.json({ message: 'Authentication successful!', token, userName: user.name });
};
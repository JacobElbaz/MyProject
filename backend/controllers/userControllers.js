import { generateToken } from "../auth/authUser.js";

// Array to temporarily store users
let users = [];

// Controller to get all users
export const getAllUsers = (req, res) => {
    const usersWithoutSensitiveInfo = users.map(({ name, email }) => ({ name, email }));

    res.json(usersWithoutSensitiveInfo);
};

// Controller to create a new user
export const createUser = (req, res) => {
  const { name, email, tel, password } = req.body;

  const newUser = {
    name,
    email,
    tel,
    password
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// Controller to LogIn a user 
export const logIn = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).json({ message: "Email doesn't match."});
    }

    if (!user.password === password) {
        return res.status(401).json({ message: 'Wrong password.'});
    }

    const token = generateToken(user);

    res.json({ message: 'Authentication successful!', token });
};
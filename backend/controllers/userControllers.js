// Array to temporarily store users
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', tel: '123-456-7890', password: 'password123' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', tel: '987-654-3210', password: 'password456' }
  ];

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

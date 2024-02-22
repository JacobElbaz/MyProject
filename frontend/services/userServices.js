const PORT = process.env.PORT || 3000;
const apiUrl = `http://localhost:${PORT}/api/users`;

export const addUser = async (userData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const data = await response.json();
      throw new Error(`Error adding user to server: ${data.message}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `${token}`,
      },
    });

    if (response.ok) {
      const result = response.json();
      return result;
    } else {
      throw new Error("Error retrieving users from the server.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logInUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.token);
      return result;
    } else {
      console.log(response);
      throw new Error("Incorrect username or password.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

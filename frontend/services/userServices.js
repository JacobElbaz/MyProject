import Cookies from "js-cookie";

const PORT = process.env.PORT || 3000;
const apiUrl = `http://localhost:${PORT}/api/users`;

// Create a new user
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

// Get the user list without sensitive data 
export const getAllUsers = async () => {
  const token = Cookies.get('token');
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


// Get token for existing user
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
      Cookies.set('token', result.token, { expires: 7, secure: true });
      return result;
    } else {
      console.log(response);
      throw new Error("Incorrect username or password.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const PORT = process.env.PORT || 3000;
const apiUrl = `http://localhost:${PORT}/api/users`;

export const addUser = async (userData) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error adding user to server.');
    }
  } catch (error) {
    throw new Error('Communication error with server:', error);
  }
};


export const getAllUsers = async () => {
    try {
        const response = await fetch(apiUrl);
        
        if(response.ok){
            const result = response.json();
            return result;
        } else {
            throw new Error('Error retrieving users from the server.');
        }
    } catch (error) {
        throw new Error('Communication error with server:', error);
    }
};

export const logInUser = async (userData) => {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
        });

        if(response.ok){
            const result = response.json();
            return result;
        } else {
            throw new Error('Error found user in the server.');
          }
    } catch (error) {
        throw new Error('Communication error with server:', error);
    }
}
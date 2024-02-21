"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userServices";
import { redirect, useRouter } from "next/navigation";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    redirect('/login');
  }

  return (
    <div className="users-list">
      <h1>Users List</h1>
      <div style={{overflowY: 'auto'}}>
        <table>
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: "3px" }}>Name</th>
              <th style={{ borderTopRightRadius: "3px" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default UsersListPage;

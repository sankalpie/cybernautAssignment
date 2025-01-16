import React, { useState } from 'react';
import apiService from '../services/apiService';
import '../styles/UserForm.css';

const UserForm = ({ users, setUsers, selectedUser, setSelectedUser, setNodes }) => {
  const [formData, setFormData] = useState({ username: '', age: '', hobbies: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        const updatedUser = await apiService.updateUser(selectedUser._id, formData);
        setUsers((prev) =>
          prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
        );
      } else {
        const newUser = await apiService.createUser(formData);
        setUsers((prev) => [...prev, newUser]);
        setNodes((prev) => [
          ...prev,
          {
            id: newUser._id,
            type: 'default',
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { label: `${newUser.username} (${newUser.age} years)` },
          },
        ]);
      }
      setFormData({ username: '', age: '', hobbies: [] });
      setSelectedUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <button type="submit">{selectedUser ? 'Update User' : 'Create User'}</button>
    </form>
  );
};

export default UserForm;

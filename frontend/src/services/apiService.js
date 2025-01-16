import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users';

const apiService = {
  getUsers: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },
  createUser: async (data) => {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  },
  deleteUser: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};

export default apiService;

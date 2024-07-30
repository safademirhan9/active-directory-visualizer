import api from './api';

export const fetchUsers = async (page = 1, pageSize = 10) => {
  const response = await api.get('/users', {
    params: { page, pageSize },
  });
  return response.data;
};

export const fetchUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

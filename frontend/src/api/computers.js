import api from './api';

export const fetchComputers = async (page = 1, pageSize = 10) => {
  const response = await api.get('/computers', {
    params: { page, pageSize },
  });
  return response.data;
};
export const fetchComputerById = async (id) => {
  const response = await api.get(`/computers/${id}`);
  return response.data;
};

import api from './api';

// export const fetchGroups = async (page = 1, pageSize = 10) => {
//   const response = await api.get('/groups', {
//     params: { page, pageSize },
//   });
//   return response.data;
// };

export const fetchGroups = async () => {
  const response = await api.get('/groups');
  return response.data;
};

export const fetchGroupById = async (id) => {
  const response = await api.get(`/groups/${id}`);
  return response.data;
};

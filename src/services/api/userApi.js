import { $api } from '../../core/axios';

const userApi = {
  async fetchUser(id) {
    const { data } = await $api.get(`/users/${id}`);
    return data;
  },

  async toggleFollow(userId, currentUserId) {
    const { data } = await $api.put(`/users/${userId}/toggleFollow`, {
      userId: currentUserId,
    });
    return data;
  },

  async findUsers(user) {
    const { data } = await $api.get('/users/find?user=' + user);
    return data;
  },

  async updateUser(data) {
    const res = await $api.put('/users/update', {
      data,
    });
    return res;
  },

  async getSuggestedUsers(max) {
    const response = await $api.get(`/users/suggested/${max || ''}`);
    return response.data;
  },
};

export default userApi;

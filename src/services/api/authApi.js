import axios from 'axios';
import { $api, API_URL } from '../../core/axios';

const authApi = {
  async login({ login, password }) {
    return $api.post('/login', { login, password });
  },

  async registration({ email, password, fullname, username }) {
    return $api.post('/registration', { email, password, fullname, username });
  },

  async logout() {
    return await $api.post('/logout');
  },

  async getMe() {
    const res = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    return res;
  },

  async verify(hash) {
    const { data } = await $api.get(`/activate?hash=${hash}`);
    return data;
  },
};
export default authApi;

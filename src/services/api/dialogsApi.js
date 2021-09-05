import { $api } from '../../core/axios';

const dialogsApi = {
  async getAll() {
    const { data } = await $api.get('/dialogs');
    return data;
  },
  create: ({ partner, text }) => $api.post('/dialogs', { partner, text }),
  async getUnreadDialogsCount() {
    const { data } = await $api.get('/dialogs/unreadCount');
    return data;
  },
};

export default dialogsApi;

import { $api } from '../../core/axios';

const messageApi = {
  getAllByDialogId: (id) => $api.get('/messages?dialog=' + id),
  removeById: (id) => $api.delete(`/messages?id=${id}`),
  send: (text, dialogId, attachments) =>
    $api.post('/messages', {
      text: text,
      dialog_id: dialogId,
      attachments,
    }),
};

export default messageApi;

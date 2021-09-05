import { $api } from '../core/axios';

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await $api.post('/upload', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;

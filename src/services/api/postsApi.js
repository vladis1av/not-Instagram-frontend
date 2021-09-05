import { $api } from '../../core/axios';

const postsApi = {
  async fetchFeed(offset = 0) {
    const res = await $api.get(`/posts/feed/${offset}`);
    return res;
  },

  fetchPosts(page, userId) {
    return $api
      .get(userId ? `/posts/user/${userId}` : `/posts?page=${page}&limit=15`)
      .then((res) => ({
        data: res.data,
        totalCount: res.headers['x-total-count'],
      }));
  },

  async sendPost(postData) {
    const { data } = await $api.post('/posts/create', {
      images: postData.images,
      text: postData.text,
    });

    return data;
  },

  async toggleLike(postId, userId) {
    const { data } = await $api.post(`/posts/${postId}/toggleLike`, {
      userId: userId,
    });
    return data;
  },

  async createComment(postId, message) {
    const res = await $api.post(`/comment/${postId}`, {
      message,
    });
    return res;
  },
};

export default postsApi;

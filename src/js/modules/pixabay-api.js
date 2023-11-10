import axios1 from 'axios';

const axios = axios1.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40557394-a61faa7e415e46037d2629f71',
    image_type: 'photo',
    safesearch: true,
    orientation: 'horizontal',
  },
});

export class PixabayAPI {
  params = { page: 1, per_page: 40 };
  totalPages = null;

  async getCards() {
    const response = await axios.get('', { params: this.params });
    return response.data;
  }
  isNextPage() {
    return this.totalPages > this.params.page;
  }
}

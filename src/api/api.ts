import axios from 'axios';

const apiYandex = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// eslint-disable-next-line import/prefer-default-export
export { apiYandex };

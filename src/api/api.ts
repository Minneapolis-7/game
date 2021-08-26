import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const apiYandex = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://ya-praktikum.tech/api/v2',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }),
  {
    ignoreHeaders: true,
  }
);

// eslint-disable-next-line import/prefer-default-export
export { apiYandex };

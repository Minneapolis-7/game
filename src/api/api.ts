import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { API_YANDEX } from '@/shared/const/const';

const apiYandex = applyCaseMiddleware(
  axios.create({
    baseURL: API_YANDEX,
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

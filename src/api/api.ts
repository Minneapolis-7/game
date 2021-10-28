import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { API_CUSTOM, API_YANDEX } from '@/shared/const/const';

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
    preservedKeys: ['ratingFieldName', 'oldPassword', 'newPassword', 'teamName'],
  }
);

const apiCustom = axios.create({
  baseURL: `http://localhost:5000${API_CUSTOM}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { apiYandex, apiCustom };

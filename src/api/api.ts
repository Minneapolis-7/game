import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { API_CUSTOM, API_YANDEX, APP_DOMAIN } from '@/shared/const/const';

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

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
  baseURL: `${isProduction ? APP_DOMAIN : ''}${API_CUSTOM}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { apiYandex, apiCustom };

import { Request } from 'express';

import themeService from '../service/themeService';

export default class ThemeAPI {
  // по userId получить тему из UserTheme
  static find = async (request: Request) => {
    const { body } = request;

    await themeService.find(body);
  };
}

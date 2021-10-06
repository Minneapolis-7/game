import { Request } from 'express';

import themeService from '@/server/services/theme/themeService';

export default class ThemeAPI {
  // по userId получить тему из UserTheme
  static find = async (request: Request) => {
    const { body } = request;

    await themeService.find(body);
  };

  // получить все темы из SiteTheme
  static findAll = async () => {
    await themeService.findAll();
  };
}

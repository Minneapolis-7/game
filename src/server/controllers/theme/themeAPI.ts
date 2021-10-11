import { Request, Response } from 'express';

import themeService from '@/server/services/theme/themeService';
import { HttpStatuses } from '@/shared/const/const';

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

  // сохранить выбор темы для user
  static save = async (request: Request, response: Response) => {
    const { body } = request;

    console.log('----themeAPI save', body);

    try {
      const record = await themeService.update('7', 5);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  };
}

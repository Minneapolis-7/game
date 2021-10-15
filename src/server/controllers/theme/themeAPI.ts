import { Request, Response } from 'express';

import themeService from '@/server/services/theme/themeService';
import { HttpStatuses } from '@/shared/const/const';

export default class ThemeAPI {
  // по userId получить тему из UserTheme
  static find = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const record = await themeService.find(id);

      response.json(record);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  };

  // получить все темы из SiteTheme
  static findAll = async (response: Response) => {
    try {
      const records = await themeService.findAll();

      response.json(records);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  };

  // сохранить выбор темы для user
  static save = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      await themeService.update(body.userId, body.themeId);

      response.sendStatus(200);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  };
}

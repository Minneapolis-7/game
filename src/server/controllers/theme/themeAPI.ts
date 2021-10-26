import { Request, Response } from 'express';

import themeService from '@/server/services/theme/themeService';
import { HttpStatuses } from '@/shared/const/const';

const themeAPI = {
  async getUserTheme(request: Request, response: Response) {
    const { userId } = request.params;

    try {
      const userTheme = await themeService.getUserTheme(Number(userId));

      if (!userTheme) {
        response.json({
          result: 'No theme applied for the user',
        });

        return;
      }

      const themeId = userTheme.getDataValue('themeId');
      const theme = await themeService.findThemeById(themeId);

      response.json(theme);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async setUserTheme(request: Request, response: Response) {
    const { userId, themeName } = request.body;

    try {
      const theme = await themeService.findThemeByName(themeName);

      if (!theme) {
        response.json({
          result: 'No such theme',
        });

        return;
      }

      await themeService.setUserTheme(userId, theme.getDataValue('id'));

      response.sendStatus(200);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json(e);
    }
  },

  async findAllThemes(response: Response) {
    try {
      const records = await themeService.findAllThemes();

      response.json(records);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },
};

export default themeAPI;

import { SiteTheme, UserTheme } from '@/server/sequelize/models';

import BaseService from '../BaseService';

class ThemeService extends BaseService {
  getUserTheme = (userId: number) => {
    return UserTheme.findOne({
      where: {
        userId,
      },
    });
  };

  setUserTheme = (userId: number, themeId: number) => {
    return UserTheme.upsert({ userId, themeId });
  };

  findAllThemes = () => {
    return SiteTheme.findAll();
  };

  findThemeByName = (themeName: string) => {
    return SiteTheme.findOne({
      where: {
        name: themeName,
      },
    });
  };

  findThemeById = (themeId: number) => {
    return SiteTheme.findOne({
      where: {
        id: themeId,
      },
    });
  };
}

const themeService = new ThemeService();

export default themeService;

import { SiteTheme, UserTheme } from '@/server/sequelize/models';

import BaseService from '../BaseService';

class ThemeService extends BaseService {
  // найти тему из табл. UserTheme, где ownerId == userId
  find = (userId: string) => {
    return UserTheme.findOne({
      where: {
        ownerId: userId,
      },
    });
  };

  // получить все темы из SiteTheme
  findAll = () => {
    return SiteTheme.findAll();
  };

  // сохранить выбор темы для user
  update = (userId: string, themeId: number) => {
    return UserTheme.upsert({ ownerId: userId, themeId, device: null });
  };
}

const themeService = new ThemeService();

export default themeService;

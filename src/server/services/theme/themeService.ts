import { SiteTheme, UserTheme } from '@/server/sequelize/models';

import BaseService from '../BaseService';

type FindRequest = {
  userId: number;
};

class ThemeService extends BaseService {
  // найти тему из табл. UserTheme, где ownerId == userId
  find = ({ userId }: FindRequest) => {
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
}

const themeService = new ThemeService();

export default themeService;

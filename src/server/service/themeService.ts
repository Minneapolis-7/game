import BaseRESTService from './BaseRESTService';

import UserTheme from '../models/Themes/UserTheme';

interface FindRequest {
  userId: number;
}

class ThemeService implements BaseRESTService {
  // найти тему из табл. UserTheme, где ownerId == userId
  public find = ({ userId }: FindRequest) => {
    return UserTheme.findOne({
      where: {
        ownerId: userId,
      },
    });
  };
}

const themeService = new ThemeService();

export default themeService;

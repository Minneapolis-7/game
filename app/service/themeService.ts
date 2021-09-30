import {SiteTheme} from '../models/SiteTheme';

interface FindRequest {
    id?: number; // ID темы в таблице
    title?: string; // Поиск по частичному совпадению в таблице
}

interface CreateRequest {
  title: string;
  description: string;
}

class ThemeService implements BaseRESTService {
  public find = ({id, title}: FindRequest) => {
    if (id) {
        return SiteTheme.findByPk(id);
    }

    return SiteTheme.findOne({
      where: {
        theme: `%${title}%`, // Защита от SQL Injection присутствует
      },
  });
  };

  public create = (data: CreateRequest) => {
    return SiteTheme.create(data);
  }
}

const themeService = new ThemeService();
export default themeService;
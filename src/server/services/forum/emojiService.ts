import { Emoji } from '@/server/sequelize/models';

import BaseService from '../BaseService';

class EmojiService extends BaseService {
  async findAll(): Promise<Emoji[]> {
    return Emoji.findAll();
  }
}

export default new EmojiService();

import { User } from '@/server/sequelize/models';
import { UserCreationAttributes } from '@/server/sequelize/models/User';

import BaseService from './BaseService';

export type UserUpdatePayload = Partial<Omit<UserCreationAttributes, 'yandexUserId'>>;

class UserService extends BaseService {
  async create(record: UserCreationAttributes): Promise<User | void> {
    const [user] = await User.findOrCreate({
      where: {
        yandexUserId: record.yandexUserId,
      },
      defaults: record,
    });

    return user;
  }

  async update(yandexUserId: number, record: UserUpdatePayload): Promise<void> {
    await User.update(record, { where: { yandexUserId } });
  }
}

export default new UserService();

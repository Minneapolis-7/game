import { User } from '@/server/sequelize/models';
import { UserCreationAttributes } from '@/server/sequelize/models/User';

import BaseService from './BaseService';

export type UserUpdatePayload = Partial<Omit<UserCreationAttributes, 'yandexUserId'>>;

class UserService extends BaseService {
  async create(record: UserCreationAttributes): Promise<User> {
    const [user] = await User.findOrCreate({
      where: {
        yandexUserId: record.yandexUserId,
      },
      defaults: record,
    });

    return user;
  }

  async update(yandexUserId: number, record: UserUpdatePayload): Promise<User> {
    const [_, users] = await User.update(record, {
      where: { yandexUserId },
      returning: true,
    });

    return users[0];
  }

  async request(yandexUserId: number): Promise<User | null> {
    return User.findOne({ where: { yandexUserId } });
  }

  async requestByLocalId(id: number): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  async requestTotal(): Promise<number> {
    return User.count();
  }
}

export default new UserService();

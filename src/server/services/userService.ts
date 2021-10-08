import { User } from '@/server/sequelize/models';
import { UserCreationAttributes } from '@/server/sequelize/models/User';

import BaseService from './BaseService';

export type UserUpdatePayload = Partial<Omit<UserCreationAttributes, 'yandexUserId'>>;

class UserService extends BaseService {
  async create(record: UserCreationAttributes): Promise<User> {
    return User.create(record);
  }

  async update(userId: number, record: UserUpdatePayload): Promise<void> {
    await User.update(record, { where: { id: userId } });
  }
}

export default new UserService();

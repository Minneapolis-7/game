import type { Request, Response } from 'express';

import { UserCreationAttributes } from '@/server/sequelize/models/User';
import userService, { UserUpdatePayload } from '@/server/services/userService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateUserRequest = Request<unknown, unknown, UserCreationAttributes>;
export type UpdateUserRequest = Request<
  {
    userId: string;
  },
  unknown,
  UserUpdatePayload
>;
export type UserRequest = Request<{
  userId: string;
}>;

const userApi = {
  async create(request: CreateUserRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await userService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json(e);
    }
  },

  async update(request: UpdateUserRequest, response: Response): Promise<void> {
    const { body } = request;
    const { userId } = request.params;

    try {
      const record = await userService.update(Number(userId), body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json(e);
    }
  },

  async request(request: UserRequest, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
      const record = await userService.request(Number(userId));

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json(e);
    }
  },
};

export default userApi;

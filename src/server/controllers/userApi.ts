import type { Request, Response } from 'express';

import { UserCreationAttributes } from '@/server/sequelize/models/User';
import userService, { UserUpdatePayload } from '@/server/services/userService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateUserRequest = Request<unknown, unknown, UserCreationAttributes>;
export type UpdateUserRequest = Request<
  {
    yandexUserId: string;
  },
  unknown,
  UserUpdatePayload
>;
export type UserRequest = Request<{
  yandexUserId: string;
}>;

const userApi = {
  async create(request: CreateUserRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await userService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async update(request: UpdateUserRequest, response: Response): Promise<void> {
    const { yandexUserId } = request.params;
    const { body } = request;

    try {
      const record = await userService.update(Number(yandexUserId), body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async request(request: UserRequest, response: Response): Promise<void> {
    const { yandexUserId } = request.params;

    try {
      const record = await userService.request(Number(yandexUserId));

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default userApi;

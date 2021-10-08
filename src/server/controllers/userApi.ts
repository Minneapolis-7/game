import type { Request, Response } from 'express';

import { UserCreationAttributes } from '@/server/sequelize/models/User';
import userService, { UserUpdatePayload } from '@/server/services/userService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateUserRequest = {
  body: UserCreationAttributes;
} & Request;

export type UpdateUserRequest = {
  body: UserUpdatePayload;
  params: {
    id: number;
  };
} & Request;

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
    const { id } = request.params;
    const { body } = request;

    try {
      await userService.update(id, body);

      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default userApi;

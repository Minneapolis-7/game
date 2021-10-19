import type { Request, Response } from 'express';

import userService from '@/server/services/userService';
import { HttpStatuses } from '@/shared/const/const';
import { ForumStatsData } from '@/shared/types/types';

const forumStatsApi = {
  async request(_request: Request, response: Response): Promise<void> {
    try {
      const registeredCount = await userService.requestTotal();

      // todo: добавить список пользователей со статусом "онлайн"
      const data: ForumStatsData = {
        registeredCount,
      };

      response.json(data);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumStatsApi;

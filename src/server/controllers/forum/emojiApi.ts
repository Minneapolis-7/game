import type { Request, Response } from 'express';

import emojiService from '@/server/services/forum/emojiService';
import { HttpStatuses } from '@/shared/const/const';

const emojiApi = {
  async findAll(_request: Request, response: Response): Promise<void> {
    try {
      const records = await emojiService.findAll();

      response.json(records);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default emojiApi;

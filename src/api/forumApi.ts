import { EmojiAttributes } from '@/server/sequelize/models/Emoji';
import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { ForumCommentEmojiUserIdentifier } from '@/server/services/forum/forumCommentEmojiService';
import { ForumCommentUpdatePayload } from '@/server/services/forum/forumCommentService';
import { ForumThreadEmojiUserIdentifier } from '@/server/services/forum/forumThreadEmojiService';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';
import {
  EmojiUserIdentifier,
  ForumCategoryData,
  ForumCommentData,
  ForumCommentEmojiData,
  ForumSectionData,
  ForumStatsData,
  ForumThreadData,
  ForumThreadEmojiData,
} from '@/shared/types/types';

import { apiCustom } from './api';

export default {
  // нужно/возможно ли типизовать возврат api? на входе в `response.json` данные типизируются, приходит `any`
  async getStats(): Promise<ForumStatsData> {
    const { data } = await apiCustom.get('/forum/stats');

    return data;
  },

  async getAvailableEmojis(): Promise<EmojiAttributes[]> {
    const { data } = await apiCustom.get('/forum/emojis');

    return data;
  },

  async getCategories(): Promise<ForumCategoryData[]> {
    const { data } = await apiCustom.get('/forum/categories');

    return data;
  },

  async getSection(id: number): Promise<ForumSectionData> {
    const { data } = await apiCustom.get(`/forum/sections/${id}`);

    return data;
  },

  async getThread(id: number): Promise<ForumThreadData> {
    const { data } = await apiCustom.get(`/forum/threads/${id}`);

    return data;
  },

  async createThread(threadData: ForumThreadCreationAttributes): Promise<ForumThreadData> {
    const { data } = await apiCustom.post('/forum/threads', threadData);

    return data;
  },

  async editThread(id: number, data: ForumThreadUpdatePayload): Promise<void> {
    await apiCustom.put(`/forum/threads/${id}`, data);
  },

  async deleteThread(id: number): Promise<void> {
    await apiCustom.delete(`/forum/threads/${id}`);
  },

  async addThreadEmoji(id: number, emoji: EmojiUserIdentifier): Promise<ForumThreadEmojiData> {
    const { data } = await apiCustom.post(`/forum/threads/${id}/emojis`, emoji);

    return data;
  },

  async deleteThreadEmoji(emoji: ForumThreadEmojiUserIdentifier): Promise<ForumThreadEmojiData> {
    const { threadId, emojiId, userId } = emoji;

    const { data } = await apiCustom.delete(
      `/forum/threads/${threadId}/emojis/${emojiId}?user=${userId}`
    );

    return data;
  },

  async createComment(commentData: ForumCommentCreationAttributes): Promise<ForumCommentData> {
    const { data } = await apiCustom.post('/forum/comments', commentData);

    return data;
  },

  async editComment(id: number, data: ForumCommentUpdatePayload): Promise<void> {
    await apiCustom.put(`/forum/comments/${id}`, data);
  },

  async deleteComment(id: number): Promise<void> {
    await apiCustom.delete(`/forum/comments/${id}`);
  },

  async addCommentEmoji(
    commentId: number,
    emoji: EmojiUserIdentifier
  ): Promise<ForumCommentEmojiData> {
    const { data } = await apiCustom.post(`/forum/comments/${commentId}/emojis`, emoji);

    return data;
  },

  async deleteCommentEmoji(emoji: ForumCommentEmojiUserIdentifier): Promise<ForumCommentEmojiData> {
    const { commentId, emojiId, userId } = emoji;

    const { data } = await apiCustom.delete(
      `/forum/comments/${commentId}/emojis/${emojiId}?user=${userId}`
    );

    return data;
  },
};

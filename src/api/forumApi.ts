import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { ForumCommentEmojiUserIdentifier } from '@/server/services/forum/forumCommentEmojiService';
import { ForumCommentUpdatePayload } from '@/server/services/forum/ForumCommentService';
import { ForumThreadEmojiUserIdentifier } from '@/server/services/forum/forumThreadEmojiService';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';
import {
  EmojiUserIdentifier,
  ForumCategoryData,
  ForumCommentData,
  ForumSectionData,
  ForumThreadData,
} from '@/shared/types/types';

import { apiCustom } from './api';

export default {
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

  async addThreadEmoji(id: number, emoji: EmojiUserIdentifier): Promise<void> {
    await apiCustom.post(`/forum/threads/${id}/emojis`, emoji);
  },

  async deleteThreadEmoji(emoji: ForumThreadEmojiUserIdentifier): Promise<void> {
    const { threadId, emojiId, userId } = emoji;

    await apiCustom.delete(`/forum/threads/${threadId}/emojis/${emojiId}?user=${userId}`);
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

  async addCommentEmoji(commentId: number, emoji: EmojiUserIdentifier): Promise<void> {
    await apiCustom.post(`/forum/comments/${commentId}/emojis`, emoji);
  },

  async deleteCommentEmoji(emoji: ForumCommentEmojiUserIdentifier): Promise<void> {
    const { commentId, emojiId, userId } = emoji;

    await apiCustom.delete(`/forum/comments/${commentId}/emojis/${emojiId}?user=${userId}`);
  },
};

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
  ForumEmojiData,
  ForumSectionData,
  ForumStatsData,
  ForumThreadData,
} from '@/shared/types/types';

import { apiCustom } from './api';

export const FORUM_API_BASE = '/forum';
export const FORUM_STATS_ENDPOINT = '/stats';
export const FORUM_EMOJIS_ENDPOINT = '/emojis';
export const FORUM_POST_EMOJIS_ENDPOINT = '/emojis';
export const FORUM_CATEGORIES_ENDPOINT = '/categories';
export const FORUM_SECTIONS_ENDPOINT = '/sections';
export const FORUM_THREADS_ENDPOINT = '/threads';
export const FORUM_COMMENTS_ENDPOINT = '/comments';

export default {
  async getStats(): Promise<ForumStatsData> {
    const { data } = await apiCustom.get(`${FORUM_API_BASE}${FORUM_STATS_ENDPOINT}`);

    return data;
  },

  async getAvailableEmojis(): Promise<EmojiAttributes[]> {
    const { data } = await apiCustom.get(`${FORUM_API_BASE}${FORUM_EMOJIS_ENDPOINT}`);

    return data;
  },

  async getCategories(): Promise<ForumCategoryData[]> {
    const { data } = await apiCustom.get(`${FORUM_API_BASE}${FORUM_CATEGORIES_ENDPOINT}`);

    return data;
  },

  async getSection(id: number): Promise<ForumSectionData> {
    const { data } = await apiCustom.get(`${FORUM_API_BASE}${FORUM_SECTIONS_ENDPOINT}/${id}`);

    return data;
  },

  async getThread(id: number): Promise<ForumThreadData> {
    const { data } = await apiCustom.get(`${FORUM_API_BASE}${FORUM_THREADS_ENDPOINT}/${id}`);

    return data;
  },

  async createThread(threadData: ForumThreadCreationAttributes): Promise<ForumThreadData> {
    const { data } = await apiCustom.post(`${FORUM_API_BASE}${FORUM_THREADS_ENDPOINT}`, threadData);

    return data;
  },

  async editThread(id: number, data: ForumThreadUpdatePayload): Promise<void> {
    await apiCustom.put(`${FORUM_API_BASE}${FORUM_THREADS_ENDPOINT}/${id}`, data);
  },

  async deleteThread(id: number): Promise<void> {
    await apiCustom.delete(`${FORUM_API_BASE}${FORUM_THREADS_ENDPOINT}/${id}`);
  },

  async addThreadEmoji(id: number, emoji: EmojiUserIdentifier): Promise<ForumEmojiData> {
    const { data } = await apiCustom.post(
      `${FORUM_API_BASE}${FORUM_THREADS_ENDPOINT}/${id}${FORUM_POST_EMOJIS_ENDPOINT}`,
      emoji
    );

    return data;
  },

  async deleteThreadEmoji(
    emoji: ForumThreadEmojiUserIdentifier
  ): Promise<ForumThreadEmojiUserIdentifier> {
    const { threadId, emojiId, userId } = emoji;

    const { data } = await apiCustom.delete(
      `${FORUM_API_BASE}${FORUM_THREADS_ENDPOINT}/${threadId}${FORUM_POST_EMOJIS_ENDPOINT}/${emojiId}?user=${userId}`
    );

    return data;
  },

  async createComment(commentData: ForumCommentCreationAttributes): Promise<ForumCommentData> {
    const { data } = await apiCustom.post(
      `${FORUM_API_BASE}${FORUM_COMMENTS_ENDPOINT}`,
      commentData
    );

    return data;
  },

  async editComment(id: number, data: ForumCommentUpdatePayload): Promise<void> {
    await apiCustom.put(`${FORUM_API_BASE}${FORUM_COMMENTS_ENDPOINT}/${id}`, data);
  },

  async deleteComment(id: number): Promise<void> {
    await apiCustom.delete(`${FORUM_API_BASE}${FORUM_COMMENTS_ENDPOINT}/${id}`);
  },

  async addCommentEmoji(commentId: number, emoji: EmojiUserIdentifier): Promise<ForumEmojiData> {
    const { data } = await apiCustom.post(
      `${FORUM_API_BASE}${FORUM_COMMENTS_ENDPOINT}/${commentId}${FORUM_POST_EMOJIS_ENDPOINT}`,
      emoji
    );

    return data;
  },

  async deleteCommentEmoji(
    emoji: ForumCommentEmojiUserIdentifier
  ): Promise<ForumCommentEmojiUserIdentifier> {
    const { commentId, emojiId, userId } = emoji;

    const { data } = await apiCustom.delete(
      `${FORUM_API_BASE}${FORUM_COMMENTS_ENDPOINT}/${commentId}${FORUM_POST_EMOJIS_ENDPOINT}/${emojiId}?user=${userId}`
    );

    return data;
  },
};

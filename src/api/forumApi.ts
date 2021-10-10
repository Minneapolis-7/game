import { ForumCategoryAttributes } from '@/server/sequelize/models/Forum/ForumCategory';
import {
  ForumCommentAttributes,
  ForumCommentCreationAttributes,
} from '@/server/sequelize/models/Forum/ForumComment';
import { ForumSectionAttributes } from '@/server/sequelize/models/Forum/ForumSection';
import {
  ForumThreadAttributes,
  ForumThreadCreationAttributes,
} from '@/server/sequelize/models/Forum/ForumThread';
import { ForumCommentEmojiUserIdentifier } from '@/server/services/forum/forumCommentEmojiService';
import { ForumCommentUpdatePayload } from '@/server/services/forum/ForumCommentService';
import { ForumThreadEmojiUserIdentifier } from '@/server/services/forum/forumThreadEmojiService';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';
import { EmojiUserIdentifier } from '@/shared/types/types';

import { apiCustom } from './api';

type ForumCommentData = ForumCommentAttributes & {
  commentEmojis: ForumCommentData[];
};
type ForumThreadData = ForumThreadAttributes & {
  comments: ForumCommentData[];
  threadEmojis: ForumCommentData[];
};
type ForumSectionData = ForumSectionAttributes & {
  threads: ForumThreadAttributes[];
};
type ForumCategoryData = ForumCategoryAttributes & {
  sections: ForumSectionAttributes[];
};

export default {
  async getCategories(): Promise<ForumCategoryData[]> {
    return apiCustom.get('/forum/categories');
  },

  async getSection(id: number): Promise<ForumSectionData> {
    return apiCustom.get(`/forum/sections/${id}`);
  },

  async getThread(id: number): Promise<ForumThreadData> {
    return apiCustom.get(`/forum/threads/${id}`);
  },

  async createThread(data: ForumThreadCreationAttributes): Promise<ForumThreadData> {
    return apiCustom.post('/forum/threads', data);
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

  async createComment(data: ForumCommentCreationAttributes): Promise<ForumCommentData> {
    return apiCustom.post('/forum/comments', data);
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

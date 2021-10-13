/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api/forumApi';
import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { ForumCommentEmojiUserIdentifier } from '@/server/services/forum/forumCommentEmojiService';
import { ForumThreadEmojiUserIdentifier } from '@/server/services/forum/forumThreadEmojiService';
import type {
  ForumState,
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '@/shared/types/redux';

export const initialState: ForumState = {
  categories: [],
  section: null,
  thread: null,
  stats: null,
  isLoading: false,
  isLoaded: false,
};

export const getStats = createAsyncThunk('forum/getStats', async (_, { rejectWithValue }) => {
  try {
    return await api.getStats();
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const getCategories = createAsyncThunk(
  'forum/getCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getStats());

      return await api.getCategories();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSection = createAsyncThunk(
  'forum/getSection',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getStats());

      return await api.getSection(id);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getThread = createAsyncThunk(
  'forum/getThread',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getStats());

      return await api.getThread(id);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createThread = createAsyncThunk(
  'forum/createThread',
  async (data: ForumThreadCreationAttributes, { rejectWithValue }) => {
    try {
      return await api.createThread(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addThreadEmoji = createAsyncThunk(
  'forum/addThreadEmoji',
  async (data: ForumThreadEmojiUserIdentifier, { rejectWithValue }) => {
    try {
      const { threadId, emojiId, userId } = data;

      return await api.addThreadEmoji(threadId, { emojiId, userId });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteThreadEmoji = createAsyncThunk(
  'forum/deleteThreadEmoji',
  async (data: ForumThreadEmojiUserIdentifier, { rejectWithValue }) => {
    try {
      return await api.deleteThreadEmoji(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  'forum/createComment',
  async (data: ForumCommentCreationAttributes, { rejectWithValue }) => {
    try {
      return await api.createComment(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCommentEmoji = createAsyncThunk(
  'forum/addCommentEmoji',
  async (data: ForumCommentEmojiUserIdentifier, { rejectWithValue }) => {
    try {
      const { commentId, emojiId, userId } = data;

      return await api.addCommentEmoji(commentId, { emojiId, userId });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCommentEmoji = createAsyncThunk(
  'forum/deleteCommentEmoji',
  async (data: ForumCommentEmojiUserIdentifier, { rejectWithValue }) => {
    try {
      return await api.deleteCommentEmoji(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

function getLoadableActionsRegexp(stage: string) {
  return new RegExp(`(getStats|getCategories|getSection|getThread|createThread)/${stage}$`);
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getSection.fulfilled, (state, action) => {
        state.section = action.payload;
      })
      .addCase(getThread.fulfilled, (state, action) => {
        state.thread = action.payload;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.section?.threads.push(action.payload);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.thread?.comments.push(action.payload);
      })
      .addMatcher(
        (action): action is PendingAction => action.type.match(getLoadableActionsRegexp('pending')),
        (state, _action) => {
          state.isLoading = true;
          state.isLoaded = false;
        }
      )
      .addMatcher(
        (action): action is FulfilledAction | RejectedAction =>
          action.type.match(getLoadableActionsRegexp('fulfilled')) ||
          action.type.match(getLoadableActionsRegexp('rejected')),
        (state, _action) => {
          state.isLoading = false;
          state.isLoaded = true;
        }
      );
  },
});

export default forumSlice.reducer;

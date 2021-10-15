/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, Draft } from '@reduxjs/toolkit';

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
import { ForumEmojiData } from '@/shared/types/types';

export const initialState: ForumState = {
  categories: [],
  section: null,
  thread: null,
  stats: null,
  availableEmojis: [],
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

export const getAvailableEmojis = createAsyncThunk(
  'forum/getAvailableEmojis',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAvailableEmojis();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      dispatch(getAvailableEmojis());

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
  return new RegExp(
    `(getStats|getAvailableEmojis|getCategories|getSection|getThread|createThread)/${stage}$`
  );
}

function addEmojiToState(emojisState: Draft<ForumEmojiData>[], payloadEmoji: ForumEmojiData) {
  const existingEmoji = emojisState.find((emoji) => emoji.id === payloadEmoji.id);

  if (existingEmoji) {
    if (!existingEmoji.users) {
      existingEmoji.users = [];
    }

    existingEmoji.users.push(payloadEmoji.users[0]);
  } else {
    emojisState.push(payloadEmoji);
  }
}

// такие манипуляции со стэйтом — это норма?
function deleteEmojiFromState(
  emojisState: Draft<ForumEmojiData>[],
  payload: ForumThreadEmojiUserIdentifier | ForumCommentEmojiUserIdentifier
) {
  const deletedEmojiIndex = emojisState.findIndex((emoji) => emoji.id === payload.emojiId);

  if (deletedEmojiIndex === -1) {
    return;
  }

  const deletedEmojiUsers = emojisState[deletedEmojiIndex].users;

  if (deletedEmojiUsers.length === 1) {
    emojisState.splice(deletedEmojiIndex, 1);
  }

  if (deletedEmojiUsers.length > 1) {
    const i = deletedEmojiUsers.findIndex((user) => user.id === payload.userId);

    deletedEmojiUsers.splice(i, 1);
  }
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
      .addCase(getAvailableEmojis.fulfilled, (state, action) => {
        state.availableEmojis = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.categories = [];
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getSection.pending, (state) => {
        state.section = null;
      })
      .addCase(getSection.fulfilled, (state, action) => {
        state.section = action.payload;
      })
      .addCase(getThread.pending, (state) => {
        state.thread = null;
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
      .addCase(addThreadEmoji.fulfilled, (state, { payload }) => {
        if (state.thread) {
          addEmojiToState(state.thread.emojis, payload);
        }
      })
      .addCase(addCommentEmoji.fulfilled, (state, { payload }) => {
        const affectedComment = state.thread?.comments.find(
          (comment) => comment.id === payload.commentId
        );

        if (affectedComment) {
          addEmojiToState(affectedComment.emojis, payload);
        }
      })
      .addCase(deleteThreadEmoji.fulfilled, (state, { payload }) => {
        if (state.thread) {
          deleteEmojiFromState(state.thread.emojis, payload);
        }
      })
      .addCase(deleteCommentEmoji.fulfilled, (state, { payload }) => {
        const affectedComment = state.thread?.comments.find(
          (comment) => comment.id === payload.commentId
        );

        if (affectedComment) {
          deleteEmojiFromState(affectedComment.emojis, payload);
        }
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

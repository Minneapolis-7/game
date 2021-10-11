/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api/forumApi';
import type { ForumState } from '@/shared/types/redux';

export const initialState: ForumState = {
  categories: [],
};

export const getCategories = createAsyncThunk(
  'forum/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getCategories();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default forumSlice.reducer;

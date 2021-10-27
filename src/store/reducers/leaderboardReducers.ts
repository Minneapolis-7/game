/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api/leaderboardApi';
import { NewLeaderData, TeamLeaderboardRequest } from '@/api/types';
import { LeaderboardState, RootState } from '@/shared/types/redux';

export const initialState: LeaderboardState = {
  leaderList: null,
  isLoading: false,
};

export const addToLeaderboard = createAsyncThunk(
  'leaderboard/addToLeaderboard',
  async (value: NewLeaderData, { rejectWithValue }) => {
    try {
      return await api.addToLeaderboard(value);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTeamLeaderboard = createAsyncThunk(
  'leaderboard/getTeamLeaderboard',
  async (payload: TeamLeaderboardRequest, { rejectWithValue }) => {
    try {
      return await api.getTeamLeaderboard(payload.teamName, payload.value);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamLeaderboard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTeamLeaderboard.fulfilled, (state, action) => {
      state.leaderList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTeamLeaderboard.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const leaderboardState = (state: RootState): LeaderboardState => ({
  ...state.leaderboard,
});

export default leaderboardSlice.reducer;

/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api/leaderboardApi';
import { LeaderboardRequest, NewLeaderData, TeamLeaderboardRequest } from '@/api/types';
import { LeaderboardState, RootState } from '@/shared/types/redux';

export const initialState: LeaderboardState = {
  leaderList: [],
};

export const addToLeaderboard = createAsyncThunk(
  'leaderboard/addToLeaderboard',
  async (value: NewLeaderData) => {
    return api.addToLeaderboard(value);
  }
);

export const getAllLeaderboard = createAsyncThunk(
  'leaderboard/getAllLeaderboard',
  async (value: LeaderboardRequest) => {
    const response = await api.getAllLeaderboard(value);

    return response;
  }
);

export const getTeamLeaderboard = createAsyncThunk(
  'leaderboard/getTeamLeaderboard',
  async (payload: TeamLeaderboardRequest) => {
    const response = await api.getTeamLeaderboard(payload.teamName, payload.value);

    return response;
  }
);

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeaderboard.fulfilled, (state, action) => {
        state.leaderList = action.payload;
      })
      .addCase(getTeamLeaderboard.fulfilled, (state, action) => {
        state.leaderList = action.payload;
      });
  },
});

export const leaderboardState = (state: RootState): LeaderboardState => ({
  ...state.leaderboard,
});

export default leaderboardSlice.reducer;

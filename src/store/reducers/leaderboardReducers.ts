/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api/leaderboardApi';
import { AddToLeaderboard, GetLeaderboard, GetTeamLeaderboard, Leader } from '@/api/types';
import type { RootState } from '@/store/store';

type leaderboardState = {
  leaderboard: Leader[];
};

const initialState: leaderboardState = {
  leaderboard: [],
};

export const addToLeaderboard = createAsyncThunk(
  'leaderboard/addToLeaderboard',
  async (value: AddToLeaderboard) => {
    await api.addToLeaderboard(value);
  }
);

export const getAllLeaderboard = createAsyncThunk(
  'leaderboard/getAllLeaderboard',
  async (value: GetLeaderboard) => {
    const response = await api.getAllLeaderboard(value);

    return response;
  }
);

export const getTeamLeaderboard = createAsyncThunk(
  'leaderboard/getTeamLeaderboard',
  async (payload: GetTeamLeaderboard) => {
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
        state.leaderboard = action.payload;
      })
      .addCase(getTeamLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
      });
  },
});

export const leaderboardState = (state: RootState): leaderboardState => ({
  ...state.leaderboard,
});

export default leaderboardSlice.reducer;

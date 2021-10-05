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
  async (value: NewLeaderData, { rejectWithValue }) => {
    try {
      return await api.addToLeaderboard(value);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllLeaderboard = createAsyncThunk(
  'leaderboard/getAllLeaderboard',
  async (value: LeaderboardRequest, { rejectWithValue }) => {
    try {
      return await api.getAllLeaderboard(value);
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

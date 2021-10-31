import { apiYandex } from './api';
import { LeaderboardRequest, LeaderData, NewLeaderData } from './types';

export default {
  async addToLeaderboard(value: NewLeaderData): Promise<void> {
    await apiYandex.post('/leaderboard', value);
  },

  async getAllLeaderboard(value: LeaderboardRequest): Promise<LeaderData[]> {
    const { data } = await apiYandex.post('/leaderboard/all', value);

    return data;
  },

  async getTeamLeaderboard(teamName: string, value: LeaderboardRequest): Promise<LeaderData[]> {
    const { data } = await apiYandex.post(`/leaderboard/${teamName}`, value);

    return data;
  },
};

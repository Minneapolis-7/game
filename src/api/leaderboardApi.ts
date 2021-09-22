import { apiYandex } from './api';
import { Leader, LeaderboardRequest, NewLeaderData } from './types';

export default {
  async addToLeaderboard(value: NewLeaderData): Promise<void> {
    await apiYandex.post('/leaderboard', value);
  },

  async getAllLeaderboard(value: LeaderboardRequest): Promise<Leader[]> {
    const { data } = await apiYandex.post('/leaderboard/all', value);

    return data;
  },

  async getTeamLeaderboard(teamName: string, value: LeaderboardRequest): Promise<Leader[]> {
    const { data } = await apiYandex.post(`/leaderboard/:${teamName}`, value);

    return data;
  },
};

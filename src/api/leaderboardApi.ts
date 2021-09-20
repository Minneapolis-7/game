import { apiYandex } from './api';
import { AddToLeaderboard, GetLeaderboard, Leader } from './types';

export default {
  async addToLeaderboard(value: AddToLeaderboard): Promise<void> {
    await apiYandex.post('/leaderboard', value);
  },

  async getAllLeaderboard(value: GetLeaderboard): Promise<Leader[]> {
    const { data } = await apiYandex.post('/leaderboard/all', value);

    return data;
  },

  async getTeamLeaderboard(teamName: string, value: GetLeaderboard): Promise<Leader[]> {
    const { data } = await apiYandex.post(`/leaderboard/:${teamName}`, value);

    return data;
  },
};

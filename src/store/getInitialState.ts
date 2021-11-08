import { RouterState } from 'connected-react-router';

import { RootState } from '@/shared/types/redux';
import { initialState as forumInitialState } from '@/store/reducers/forumReducers';
import { initialState as leaderboardInitialState } from '@/store/reducers/leaderboardReducers';
import { initialState as profileInitialState } from '@/store/reducers/profileReducers';
import { initialState as userInitialState } from '@/store/reducers/userReducers';

export default function getInitialState(pathname = '/'): RootState {
  return {
    user: userInitialState,
    profile: profileInitialState,
    leaderboard: leaderboardInitialState,
    forum: forumInitialState,
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP',
    } as RouterState,
  };
}

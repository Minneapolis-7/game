const paths = {
  LOGIN: '/login',
  REGISTER: '/signup',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_EDIT_PASSWORD: '/profile/edit/password',
  // первым в массиве должен идти основной путь
  FORUM: ['/forum', '/forum/:sectionId', '/forum/:sectionId/thread/:threadId'],
  LEADERBOARD: '/leaderboard',
  SERVER_ERROR: '/server-error',
  NOT_FOUND: '/not-found',
};

export default paths;

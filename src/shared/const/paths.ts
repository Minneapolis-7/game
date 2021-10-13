const paths = {
  LOGIN: '/login',
  REGISTER: '/signup',
  PROFILE: '/profile/:userId?',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_EDIT_PASSWORD: '/profile/edit/password',
  FORUM: '/forum',
  FORUM_SECTION: '/forum/:sectionId',
  FORUM_THREAD: '/forum/:sectionId/thread/:threadId',
  FORUM_THREAD_CREATE: '/forum/:sectionId/thread/:threadId',
  FORUM_COMMENT: '/forum/:sectionId/thread/:threadId#:commentId',
  LEADERBOARD: '/leaderboard',
  SERVER_ERROR: '/server-error',
  NOT_FOUND: '/not-found',
};

export default paths;

import {
  ForumMainPage,
  ForumSectionPage,
  ForumThreadCreatePage,
  ForumThreadPage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  Page404,
  Page500,
  ProfileEditPage,
  ProfileEditPasswordPage,
  ProfilePage,
  RegisterPage,
} from '@/pages';
import paths from '@/shared/const/paths';

const routes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.PROFILE,
    component: ProfilePage,
    exact: true,
    protected: true,
  },
  {
    path: paths.PROFILE_EDIT,
    component: ProfileEditPage,
    exact: true,
    protected: true,
  },
  {
    path: paths.PROFILE_EDIT_PASSWORD,
    component: ProfileEditPasswordPage,
    exact: true,
    protected: true,
  },
  {
    path: paths.FORUM,
    component: ForumMainPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM_SECTION,
    component: ForumSectionPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM_THREAD,
    component: ForumThreadPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM_THREAD_CREATE,
    component: ForumThreadCreatePage,
    exact: true,
    protected: false,
  },
  {
    path: paths.LEADERBOARD,
    component: LeaderboardPage,
    exact: true,
    protected: false,
  },
  {
    path: paths.SERVER_ERROR,
    component: Page500,
    exact: true,
    protected: false,
  },
  {
    path: '*',
    component: Page404,
    exact: true,
    protected: false,
  },
];

export default routes;

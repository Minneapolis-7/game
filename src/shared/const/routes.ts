import {
  ForumMainPage,
  ForumSectionPage,
  ForumThreadCreatePage,
  ForumThreadPage,
  LeaderboardPage,
  LoginPage,
  MainPage,
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
    title: 'Старт',
    exact: true,
    protected: false,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    title: 'Логин',
    exact: true,
    protected: false,
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    title: 'Регистрация',
    exact: true,
    protected: false,
  },
  {
    path: paths.PROFILE,
    component: ProfilePage,
    title: 'Профиль',
    exact: true,
    protected: false,
  },
  {
    path: paths.PROFILE_EDIT,
    component: ProfileEditPage,
    title: 'Редактирование профиля',
    exact: true,
    protected: false,
  },
  {
    path: paths.PROFILE_EDIT_PASSWORD,
    component: ProfileEditPasswordPage,
    title: 'Редактирование пароля',
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM,
    component: ForumMainPage,
    title: 'Форум',
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM_SECTION,
    component: ForumSectionPage,
    title: 'Раздел форума',
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM_THREAD,
    component: ForumThreadPage,
    title: 'Тема форума',
    exact: true,
    protected: false,
  },
  {
    path: paths.FORUM_THREAD_CREATE,
    component: ForumThreadCreatePage,
    title: 'Тема форума',
    exact: true,
    protected: false,
  },
  {
    path: paths.LEADERBOARD,
    component: LeaderboardPage,
    title: 'Рейтинг игроков',
    exact: true,
    protected: false,
  },
];

export default routes;

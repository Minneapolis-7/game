import {
  MainPage,
  LoginPage,
  ProfileEditPage,
  ProfileEditPasswordPage,
  ProfilePage,
  RegisterPage,
  ForumMainPage,
  ForumSectionPage,
  ForumThreadPage,
  ForumThreadCreatePage,
  LeaderboardPage,
} from '@/pages';
import paths from '@/shared/const/paths';

const routes = [
  {
    path: '/',
    component: MainPage,
    title: 'Старт',
    exact: true,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    title: 'Логин',
    exact: true,
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    title: 'Регистрация',
    exact: true,
  },
  {
    path: paths.PROFILE,
    component: ProfilePage,
    title: 'Профиль',
    exact: true,
  },
  {
    path: paths.PROFILE_EDIT,
    component: ProfileEditPage,
    title: 'Редактирование профиля',
    exact: true,
  },
  {
    path: paths.PROFILE_EDIT_PASSWORD,
    component: ProfileEditPasswordPage,
    title: 'Редактирование пароля',
    exact: true,
  },
  {
    path: paths.FORUM,
    component: ForumMainPage,
    title: 'Форум',
    exact: true,
  },
  {
    path: paths.FORUM_SECTION,
    component: ForumSectionPage,
    title: 'Раздел форума',
    exact: true,
  },
  {
    path: paths.FORUM_THREAD,
    component: ForumThreadPage,
    title: 'Тема форума',
    exact: true,
  },
  {
    path: paths.FORUM_THREAD_CREATE,
    component: ForumThreadCreatePage,
    title: 'Тема форума',
    exact: true,
  },
  {
    path: paths.LEADERBOARD,
    component: LeaderboardPage,
    title: 'Рейтинг игроков',
    exact: true,
  },
];

export default routes;

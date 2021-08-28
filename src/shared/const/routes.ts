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
    isProtected: false,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    title: 'Логин',
    exact: true,
    isProtected: false,
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    title: 'Регистрация',
    exact: true,
    isProtected: false,
  },
  {
    path: paths.PROFILE,
    component: ProfilePage,
    title: 'Профиль',
    exact: true,
    isProtected: true,
  },
  {
    path: paths.PROFILE_EDIT,
    component: ProfileEditPage,
    title: 'Редактирование профиля',
    exact: true,
    isProtected: true,
  },
  {
    path: paths.PROFILE_EDIT_PASSWORD,
    component: ProfileEditPasswordPage,
    title: 'Редактирование пароля',
    exact: true,
    isProtected: true,
  },
  {
    path: paths.FORUM,
    component: ForumMainPage,
    title: 'Форум',
    exact: true,
    isProtected: false,
  },
  {
    path: paths.FORUM_SECTION,
    component: ForumSectionPage,
    title: 'Раздел форума',
    exact: true,
    isProtected: false,
  },
  {
    path: paths.FORUM_THREAD,
    component: ForumThreadPage,
    title: 'Тема форума',
    exact: true,
    isProtected: false,
  },
  {
    path: paths.FORUM_THREAD_CREATE,
    component: ForumThreadCreatePage,
    title: 'Тема форума',
    exact: true,
    isProtected: false,
  },
  {
    path: paths.LEADERBOARD,
    component: LeaderboardPage,
    title: 'Рейтинг игроков',
    exact: true,
    isProtected: false,
  },
];

export default routes;

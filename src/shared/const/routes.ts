import {
  LoginPage,
  ProfileEditPage,
  ProfileEditPasswordPage,
  ProfilePage,
  RegisterPage,
  LeaderboardPage,
} from 'pages';
import paths from 'shared/const/paths';

const routes = [
  {
    path: '/',
    component: LoginPage,
    title: 'Логин',
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
    path: paths.LEADERBOARD,
    component: LeaderboardPage,
    title: 'Редактирование пароля',
    exact: true,
  },
];

export default routes;

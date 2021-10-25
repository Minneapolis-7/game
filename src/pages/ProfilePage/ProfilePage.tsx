import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Profile from '@/modules/Profile';
import { useAppSelector } from '@/store/store';

const mockUserData = {
  firstName: 'Имя',
  secondName: 'Фамилия',
  displayName: 'Nickname',
  login: 'mylogin',
  email: 'my@email.com',
};

function ProfilePage({ title }: GenericPageProps): JSX.Element {
  const { firstName, secondName, displayName, login, email } = useAppSelector(
    (state) => state.user
  );

  const userData = {
    firstName,
    secondName,
    displayName,
    login,
    email,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page>
        <Profile user={userData} />
      </Page>
    </>
  );
}

export default ProfilePage;

import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Profile from '@/modules/Profile';

const mockUserData = {
  firstName: 'Имя',
  secondName: 'Фамилия',
  displayName: 'Nickname',
  login: 'mylogin',
  email: 'my@email.com',
};

function ProfileEditPasswordPage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page>
        <Profile user={mockUserData} action="edit-password" />
      </Page>
    </>
  );
}

export default ProfileEditPasswordPage;

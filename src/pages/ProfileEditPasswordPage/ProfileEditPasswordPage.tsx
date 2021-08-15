import React from 'react';

import Page from 'layout/Page';
import Profile from 'modules/Profile';

const mockUserData = {
  firstName: 'Имя',
  secondName: 'Фамилия',
  displayName: 'Nickname',
  login: 'mylogin',
  email: 'my@email.com',
};

function ProfileEditPasswordPage({ title }: { title: string }): JSX.Element {
  return (
    <Page title={title}>
      <Profile user={mockUserData} action="edit-password" />
    </Page>
  );
}

export default ProfileEditPasswordPage;

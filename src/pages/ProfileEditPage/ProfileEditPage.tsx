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

function ProfileEditPage({ title }: { title: string }): JSX.Element {
  return (
    <Page title={title}>
      <Profile user={mockUserData} action="edit" />
    </Page>
  );
}

export default ProfileEditPage;

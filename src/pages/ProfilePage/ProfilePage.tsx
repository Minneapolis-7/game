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

function ProfilePage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page title={title}>
      <Profile user={mockUserData} />
    </Page>
  );
}

export default ProfilePage;

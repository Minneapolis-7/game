import React from 'react';

import Page from 'layout/Page';
import Profile from 'modules/Profile';

const mockUserData = {
  avatar:
    '/402ddb58-d6f1-4635-a98d-39b1d2774ab8/d1a84e4e-b561-4310-9930-8ca169ede8ff_ef819c056521aeee8f14600acd82d99d.png',
  firstName: 'Имя',
  secondName: 'Фамилия',
  displayName: 'Nickname',
  login: 'mylogin',
  email: 'my@email.com',
};

function ProfileEditPasswordPage(): JSX.Element {
  return (
    <Page>
      <Profile user={mockUserData} action="edit-password" />
    </Page>
  );
}

export default ProfileEditPasswordPage;

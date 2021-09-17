import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Profile from '@/modules/Profile';
import text from '@/shared/const/text';

const mockUserData = {
  firstName: 'Имя',
  secondName: 'Фамилия',
  displayName: 'Nickname',
  login: 'mylogin',
  email: 'my@email.com',
};

function ProfilePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.profile.title}</title>
      </Helmet>
      <Page>
        <Profile user={mockUserData} />
      </Page>
    </>
  );
}

export default ProfilePage;

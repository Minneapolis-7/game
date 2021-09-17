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

function ProfileEditPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.profile.editTitle}</title>
      </Helmet>
      <Page>
        <Profile user={mockUserData} action="edit" />
      </Page>
    </>
  );
}

export default ProfileEditPage;

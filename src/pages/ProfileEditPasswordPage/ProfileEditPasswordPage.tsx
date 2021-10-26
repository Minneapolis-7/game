import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Profile from '@/modules/Profile';

function ProfileEditPasswordPage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page>
        <Profile action="edit-password" />
      </Page>
    </>
  );
}

export default ProfileEditPasswordPage;

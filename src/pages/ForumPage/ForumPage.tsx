import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Forum from '@/modules/Forum';

function ForumPage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page delegated>
        <Forum />
      </Page>
    </>
  );
}

export default ForumPage;

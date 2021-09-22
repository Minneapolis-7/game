import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Forum from '@/modules/Forum';

function ForumThreadCreatePage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page delegated>
        <Forum extendedSection="12" />
      </Page>
    </>
  );
}

export default ForumThreadCreatePage;

import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Forum from '@/modules/Forum';
import text from '@/shared/const/text';

function ForumThreadCreatePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.forum.title}</title>
      </Helmet>
      <Page delegated>
        <Forum extendedSection="12" />
      </Page>
    </>
  );
}

export default ForumThreadCreatePage;

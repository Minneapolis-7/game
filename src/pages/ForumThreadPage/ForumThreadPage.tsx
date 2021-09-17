import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Forum from '@/modules/Forum';
import text from '@/shared/const/text';

function ForumThreadPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.forum.title}</title>
      </Helmet>
      <Page delegated>
        <Forum thread="11" />
      </Page>
    </>
  );
}

export default ForumThreadPage;

import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Forum from '@/modules/Forum';
import text from '@/shared/const/text';

function ForumSectionPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.forum.title}</title>
      </Helmet>
      <Page delegated>
        <Forum section="1" />
      </Page>
    </>
  );
}

export default ForumSectionPage;

import React from 'react';

import Page from '@/layout/Page';
import Forum from '@/modules/Forum';

function ForumThreadCreatePage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page delegated title={title}>
      <Forum extendedSection="12" />
    </Page>
  );
}

export default ForumThreadCreatePage;

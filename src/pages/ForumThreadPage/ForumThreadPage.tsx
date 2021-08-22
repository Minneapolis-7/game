import React from 'react';

import Page from 'layout/Page';
import Forum from 'modules/Forum';

function ForumThreadPage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page delegated title={title}>
      <Forum thread="11" />
    </Page>
  );
}

export default ForumThreadPage;

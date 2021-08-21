import React from 'react';

import Page from 'layout/Page';
import Forum from 'modules/Forum';

function ForumMainPage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page delegated title={title}>
      <Forum />
    </Page>
  );
}

export default ForumMainPage;

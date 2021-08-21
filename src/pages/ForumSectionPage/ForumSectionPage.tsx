import React from 'react';

import Page from 'layout/Page';
import Forum from 'modules/Forum';

function ForumSectionPage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page delegated title={title}>
      <Forum section="1" />
    </Page>
  );
}

export default ForumSectionPage;

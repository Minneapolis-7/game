import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Status from '@/modules/Status';

function Page500({ title }: GenericPageProps): JSX.Element {
  return (
    <Status code={500}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page centered>
        <h2>Ошибка сервера</h2>
      </Page>
    </Status>
  );
}

export default Page500;

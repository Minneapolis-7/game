import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Status from '@/modules/Status';

function Page404({ title }: GenericPageProps): JSX.Element {
  return (
    <Status code={404}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page centered>
        <h2>Не найдено</h2>
      </Page>
    </Status>
  );
}

export default Page404;

import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Status from '@/modules/Status';
import text from '@/shared/const/text';

function Page500(): JSX.Element {
  return (
    <Status code={500}>
      <Helmet>
        <title>{text.page500.title}</title>
      </Helmet>
      <Page centered>
        <h2>Ошибка сервера</h2>
      </Page>
    </Status>
  );
}

export default Page500;

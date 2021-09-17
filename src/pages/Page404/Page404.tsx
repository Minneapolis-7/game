import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Status from '@/modules/Status';
import text from '@/shared/const/text';

function Page404(): JSX.Element {
  return (
    <Status code={404}>
      <Helmet>
        <title>{text.page404.title}</title>
      </Helmet>
      <Page centered>
        <h2>Не найдено</h2>
      </Page>
    </Status>
  );
}

export default Page404;

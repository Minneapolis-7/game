import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Page from '@/layout/Page';
import text from '@/shared/const/text';

const { offlineNoticePage: txt } = text;

function OfflineNoticePage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page centered>
        <h2 className="tac">
          {txt.message}{' '}
          <Link className="link" to="/">
            {txt.action}
          </Link>
        </h2>
      </Page>
    </>
  );
}

export default OfflineNoticePage;

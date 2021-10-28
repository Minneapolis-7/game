import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouterContext } from 'react-router';
import { Route, StaticRouter, Switch } from 'react-router-dom';
import { Request, Response } from 'express';
import htmlescape from 'htmlescape';

import api from '@/api/userApi';
import { Toaster } from '@/components/ui';
import ProtectedRoute from '@/modules/ProtectedRoute';
import paths from '@/shared/const/paths';
import routes from '@/shared/const/routes';
import getThemeClassname from '@/shared/utils/getThemeClassname';
import getInitialState from '@/store/getInitialState';
import { applyTheme, setUser } from '@/store/reducers/actions';
import initStore from '@/store/store';

// eslint-disable-next-line
// @ts-ignore убрать ошибку если файла ещё нет (когда клиентский билд ни разу не выполнялся)
import manifestJson from '../../../dist/static/manifest.json'; // eslint-disable-line
import sprite from 'svg-sprite-loader/runtime/sprite.build';

const manifest = typeof manifestJson === 'string' ? JSON.parse(manifestJson) : manifestJson;
const spriteContent = sprite.stringify();
let themeClassname = getThemeClassname('default');

function getPageHTML(
  appHTML: string,
  reduxState = {},
  helmetData: HelmetData,
  nonce: string
): string {
  return `<!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      ${helmetData.title.toString()}
      ${helmetData.meta.toString()}

      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/${manifest['main.css']}">
      ${manifest['vendors.js'] ? `<script src="/${manifest['vendors.js']}" defer></script>` : ''}
      <script src="/${manifest['main.js']}" defer></script>
    </head>
    <body class="${themeClassname}">
      ${spriteContent}
      <div class="root" id="root">${appHTML}</div>
      <script nonce="${nonce}">
        window.__INITIAL_STATE__ = ${htmlescape(reduxState)}
      </script>
    </body>
  </html>`;
}

export default async function ssr(req: Request, res: Response) {
  const location = req.url;
  const { nonce } = res.locals;
  const ctx: StaticRouterContext = {};
  let html = '';
  const { store } = initStore(getInitialState(location), location);
  const { yandexUser } = req.app.locals;
  const isAuthPage = location === paths.LOGIN || location === paths.REGISTER;

  function renderApp() {
    try {
      html = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={ctx}>
            <Switch>
              {routes.map((route) => {
                const Component = route.component;

                let RouteComponent: typeof Route | typeof ProtectedRoute = Route;

                if (route.protected) {
                  RouteComponent = ProtectedRoute;
                }

                return (
                  <RouteComponent key={route.path} path={route.path} exact={route.exact}>
                    <Component title={route.title || ''} />
                  </RouteComponent>
                );
              })}
            </Switch>
          </StaticRouter>
          <Toaster toastList={[]} position="bottom-right" />
        </Provider>
      );
    } catch (e) {
      ctx.url = paths.SERVER_ERROR;
    }

    if (yandexUser && isAuthPage) {
      ctx.url = '/';
    }

    if (ctx.url) {
      res.redirect(ctx.url);

      return;
    }

    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.status(ctx.statusCode || 200).send(getPageHTML(html, reduxState, helmetData, nonce));
  }

  try {
    if (yandexUser) {
      const localUser = await api.setLocalUser(yandexUser);
      const { name: themeName } = await api.getUserTheme(localUser.id as number);

      store.dispatch(applyTheme(themeName));
      store.dispatch(setUser(localUser));

      themeClassname = getThemeClassname(themeName);
    }
  } catch (e) {
    console.log(e);
  } finally {
    renderApp();
  }
}

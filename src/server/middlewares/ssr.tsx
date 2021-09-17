import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouterContext } from 'react-router';
import { Route, StaticRouter, Switch } from 'react-router-dom';
import { Request, Response } from 'express';
import htmlescape from 'htmlescape';

import ProtectedRoute from '@/modules/ProtectedRoute';
import paths from '@/shared/const/paths';
import routes from '@/shared/const/routes';
import getInitialState from '@/store/getInitialState';
import initStore from '@/store/store';

// eslint-disable-next-line
// @ts-ignore
import manifestJson from '../../../dist/static/manifest.json';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

const manifest = typeof manifestJson === 'string' ? JSON.parse(manifestJson) : manifestJson;
const spriteContent = sprite.stringify();

function getPageHTML(appHTML: string, reduxState = {}, helmetData: HelmetData): string {
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
      <script src="/${manifest['main.js']}" defer></script>
    </head>
    <body>
      ${spriteContent}
      <div class="root" id="root">${appHTML}</div>
      <script>
        window.__INITIAL_STATE__ = ${htmlescape(reduxState)}
      </script>
    </body>
  </html>`;
}

export default function ssr(req: Request, res: Response) {
  const location = req.url;
  const ctx: StaticRouterContext = {};
  let html = '';
  const { store } = initStore(getInitialState(location), location);

  console.log(req.cookies, req.signedCookies);

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
                  <Component />
                </RouteComponent>
              );
            })}
          </Switch>
        </StaticRouter>
      </Provider>
    );
  } catch (e) {
    ctx.url = paths.SERVER_ERROR;
  }

  if (ctx.url) {
    res.redirect(ctx.url);

    return;
  }

  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();

  res.status(ctx.statusCode || 200).send(getPageHTML(html, reduxState, helmetData));
}

import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { block } from 'bem-cn';

import { Icon } from '@/components/ui';
import PageContext from '@/layout/Page/PageContext';
import Sidebar from '@/modules/Sidebar';
import { SizeLabels } from '@/shared/const/const';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';

import offlineSvg from 'bootstrap-icons/icons/wifi-off.svg';

type PageProps = {
  centered?: boolean; // контент страницы центрирован
  fullscreen?: boolean; // страница растянута на весь экран, но скролл зарещён
  // делегировать некоторые CSS-свойства, присущие для `.page` — ребёнку
  // (см. `page.scss`, нужно для управления высотой содержимого)
  delegated?: boolean;
  hasSidebar?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const b = block('page');

const OFFLINE_CLASSNAME = 'is-offline';

function Page(props: PageProps): JSX.Element {
  const {
    className = '',
    centered = false,
    fullscreen = false,
    delegated = false,
    hasSidebar = true,
    children,
    ...rest
  } = props;
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const ctx = {
    isSidebarOpened,
    toggleSidebar(force: boolean) {
      setIsSidebarOpened((prev) => force ?? !prev);
    },
  };
  const history = useHistory();
  const { pathname } = useLocation();

  const toggleOffline = () => {
    document.body.classList.toggle(OFFLINE_CLASSNAME, !window.navigator.onLine);
  };

  useEffect(() => {
    const isOffline = !window.navigator.onLine;

    if (isOffline && pathname !== '/') {
      history.replace(paths.OFFLINE_NOTICE);
    }

    if (!isOffline && pathname === paths.OFFLINE_NOTICE) {
      history.replace('/');
    }

    if (!isOffline) {
      document.body.classList.remove(OFFLINE_CLASSNAME);
    }

    window.addEventListener('online', toggleOffline);
    window.addEventListener('offline', toggleOffline);

    return () => {
      window.removeEventListener('online', toggleOffline);
      window.removeEventListener('offline', toggleOffline);
    };
  }, [history, pathname]);

  return (
    <PageContext.Provider value={ctx}>
      <div
        className={b({
          centered,
          fullscreen: fullscreen && !centered,
          delegated: delegated && !fullscreen && !centered,
        }).mix(className.split(' '))}
        {...rest}
      >
        <Link
          to="/"
          component={getRoutedButtonLink({
            theme: 'morphed',
            title: text.offlineBadgeTitle,
            className: b('offline-badge'),
            size: SizeLabels.LG,
            icon: <Icon name={offlineSvg.id} scale={1.5} />,
          })}
        />
        {hasSidebar && <Sidebar isOpened={isSidebarOpened} className={b('sidebar')} />}
        {centered ? <div className={b('centerer')}>{children}</div> : children}
      </div>
    </PageContext.Provider>
  );
}

export default Page;

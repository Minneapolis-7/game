import React, { HTMLAttributes, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import PageContext from '@/layout/Page/PageContext';
import Sidebar from '@/modules/Sidebar';

type PageProps = {
  centered?: boolean; // контент страницы центрирован
  fullscreen?: boolean; // страница растянута на весь экран, но скролл зарещён
  // делегировать некоторые CSS-свойства, присущие для `.page` — ребёнку
  // (см. `page.scss`, нужно для управления высотой содержимого)
  delegated?: boolean;
  title?: string;
  hasSidebar?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const b = block('page');

function Page(props: PageProps): JSX.Element {
  const {
    className = '',
    centered = false,
    fullscreen = false,
    delegated = false,
    title = '',
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

  useEffect(() => {
    document.title = title;
  }, [title]);

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
        {hasSidebar && <Sidebar isOpened={isSidebarOpened} className={b('sidebar')} />}
        {centered ? <div className={b('centerer')}>{children}</div> : children}
      </div>
    </PageContext.Provider>
  );
}

export default Page;

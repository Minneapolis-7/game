import React, { HTMLAttributes, useEffect } from 'react';
import { block } from 'bem-cn';

type PageProps = {
  centered?: boolean; // контент страницы центрирован
  fullscreen?: boolean; // страница растянута на весь экран, но скролл зарещён
  // делегировать некоторые CSS-свойства, присущие для `.page` — ребёнку
  // (см. `page.scss`, нужно для управления высотой содержимого)
  delegated?: boolean;
  title?: string;
} & HTMLAttributes<HTMLDivElement>;

const b = block('page');

function Page({
  className = '',
  centered = false,
  fullscreen = false,
  delegated = false,
  title = '',
  children,
  ...rest
}: PageProps): JSX.Element {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className={b({
        centered,
        fullscreen: fullscreen && !centered,
        delegated: delegated && !fullscreen && !centered,
      }).mix(className.split(' '))}
      {...rest}
    >
      {centered ? <div className={b('centerer')}>{children}</div> : children}
    </div>
  );
}

export default Page;

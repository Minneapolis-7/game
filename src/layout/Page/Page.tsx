import React, { HTMLAttributes } from 'react';
import { block } from 'bem-cn';

type PageProps = {
  centered?: boolean; // контент страницы центрирован
  fullscreen?: boolean; // страница растянута на весь экран, но скролл зарещён
} & HTMLAttributes<HTMLDivElement>;

const b = block('page');

function Page({
  className = '',
  centered = false,
  fullscreen = false,
  children,
  ...rest
}: PageProps): JSX.Element {
  return (
    <div className={b({ centered, fullscreen }).mix(className.split(' '))} {...rest}>
      {fullscreen ? (
        children
      ) : (
        <div className={`${b('content')} ${centered ? b('centerer') : ''}`}>{children}</div>
      )}
    </div>
  );
}

export default Page;

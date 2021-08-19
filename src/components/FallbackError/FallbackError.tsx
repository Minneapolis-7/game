import React, { PropsWithChildren } from 'react';
import { block } from 'bem-cn';

const b = block('fallback-error');

type FallbackErrorProps = PropsWithChildren<Record<string, unknown>>;

function FallbackError({ children }: FallbackErrorProps): JSX.Element {
  return (
    <div className={b()}>
      <h4 className={b('heading').mix('heading')}>Сайт сломался, но его уже чинят</h4>
      {children}
    </div>
  );
}

export default FallbackError;

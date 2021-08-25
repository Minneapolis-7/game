import React from 'react';
import { block } from 'bem-cn';

const b = block('fallback-error');

function FallbackError(): JSX.Element {
  return (
    <div className={b()}>
      <h4 className={b('heading').mix('heading_4', 'heading')}>Сайт сломался, но его уже чинят</h4>
    </div>
  );
}

export default FallbackError;

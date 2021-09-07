import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { block } from 'bem-cn';

import { Spinner } from '@/components/ui';

import { ButtonBaseProps } from './types';

type ButtonProps = {
  waiting?: boolean;
} & ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const b = block('button');

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props: ButtonProps,
  ref
): JSX.Element {
  const {
    className = '',
    theme = 'default',
    sizing = 'default',
    display,
    type = 'button',
    icon,
    waiting = false,
    children,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={b({ theme, sizing }).state({ waiting }).mix(className.split(' '))}
      data-display={display}
      type={type}
      draggable="false"
      disabled={waiting}
      {...rest}
    >
      {icon && <span className={b('icon')}>{icon}</span>}
      <span className={b('text')}>{children}</span>
      {waiting && <Spinner className={b('spinner')} />}
    </button>
  );
});

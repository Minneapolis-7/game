import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { block } from 'bem-cn';

import { ButtonBaseProps } from './types';

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const b = block('button');

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = '', theme, sizing, display, type = 'button', icon, children, ...rest }: ButtonProps,
  ref
): JSX.Element {
  return (
    <button
      ref={ref}
      className={b({ theme, sizing }).mix(className.split(' '))}
      data-display={display}
      type={type}
      draggable="false"
      {...rest}
    >
      {icon && <span className={b('icon')}>{icon}</span>}
      <span className={b('text')}>{children}</span>
    </button>
  );
});

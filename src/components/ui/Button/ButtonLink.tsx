import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import { block } from 'bem-cn';

import { ButtonBaseProps } from './types';

type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const b = block('button');

export { ButtonLinkProps };

export default forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  props: ButtonLinkProps,
  ref
): JSX.Element {
  const {
    className = '',
    theme = 'default',
    sizing = 'default',
    display,
    href = '#',
    icon,
    children,
    ...rest
  } = props;

  return (
    <a
      ref={ref}
      className={b({ theme, sizing }).mix(className.split(' '))}
      data-display={display}
      href={href}
      draggable="false"
      {...rest}
    >
      {icon && <span className={b('icon')}>{icon}</span>}
      <span className={b('text')}>{children}</span>
    </a>
  );
});

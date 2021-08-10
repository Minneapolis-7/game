import React, { HTMLAttributes } from 'react';
import { block } from 'bem-cn';

type IconProps = {
  name: string; // id, возвращаемое `svg-sprite-loader`: https://github.com/JetBrains/svg-sprite-loader#runtime-configuration
  size?: string; // CSS-значения, например: `2rem`, `32px`, в рамках того, что можно установить как `width` и `height` для `<svg>`
} & HTMLAttributes<HTMLSpanElement>;

const b = block('icon');

function Icon({ className = '', name, size = '1em', ...rest }: IconProps): JSX.Element {
  return (
    <span className={`${b()} ${className}`} {...rest}>
      <svg style={{ width: size, height: size }} className={b('svg')}>
        <use xlinkHref={`#${name}`}></use>
      </svg>
    </span>
  );
}

export default Icon;

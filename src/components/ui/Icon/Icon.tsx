import React, { CSSProperties, HTMLAttributes } from 'react';
import { block } from 'bem-cn';

type IconProps = {
  name: string; // id, возвращаемое `svg-sprite-loader`: https://github.com/JetBrains/svg-sprite-loader#runtime-configuration
  size?: string; // CSS-значения, например: `2rem`, `32px`, в рамках того, что можно установить как `width` и `height` для `<svg>`
  scale?: number; // коэффициент скалирования иконки
  align?: string; // значения для `vertical-align`: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
} & HTMLAttributes<HTMLSpanElement>;

const b = block('icon');

function Icon(props: IconProps): JSX.Element {
  const { className = '', name, size = '1em', scale = 1, align = 'baseline', ...rest } = props;

  return (
    <span
      style={{ verticalAlign: align, '--scale': scale } as CSSProperties}
      className={b({}).mix(className.split(' '))}
      {...rest}
    >
      <svg role="img" style={{ width: size, height: size }} className={b('svg')}>
        <use href={`#${name}`} />
      </svg>
    </span>
  );
}

export default Icon;

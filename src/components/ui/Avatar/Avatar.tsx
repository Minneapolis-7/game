import React, { CSSProperties, PropsWithChildren } from 'react';
import { block } from 'bem-cn';

type AvatarProps = PropsWithChildren<{
  src?: string;
  className?: string;
  theme?: string;
  populatable?: boolean;
  size?: string;
  width?: string;
  height?: string;
  retinaSuffix?: string;
}>;

const b = block('avatar');

function Avatar(props: AvatarProps): JSX.Element {
  const {
    className = '',
    src,
    theme,
    populatable = false,
    size,
    width,
    height,
    retinaSuffix,
    children,
    ...rest
  } = props;
  const w = size || width;
  const picStyle: {
    '--at2x'?: string;
  } & CSSProperties = src ? { backgroundImage: `url(${src})` } : {};

  if (src && retinaSuffix) {
    picStyle['--at2x'] = `url("${src.replace(/.([^.]*)$/, `${retinaSuffix}.$1`)}")`;
  }

  if (width && height) {
    picStyle.paddingTop = `${100 * (parseFloat(height) / parseFloat(width))}%`;
  }

  if (size) {
    picStyle.paddingTop = '100%';
  }

  return (
    <figure
      className={b({ theme, populatable }).mix(className.split(' '))}
      style={w ? { width: w } : undefined}
      {...rest}
    >
      <div
        className={b('pic', { retina: Boolean(retinaSuffix) })}
        style={src ? picStyle : undefined}
        data-populated={Boolean(src)}
      >
        {src && <img className={b('img')} src={src} alt="" />}
        {children}
      </div>
    </figure>
  );
}

export default Avatar;

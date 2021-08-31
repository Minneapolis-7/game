import React, { HTMLAttributes } from 'react';
import { block } from 'bem-cn';

type SpinnerProps = {
  className?: string;
  size?: SizeLabel;
  color?: string;
  position?: 'center' | `${CSSLengthString};${CSSLengthString}`; // `x;y`
} & HTMLAttributes<HTMLDivElement>;

const b = block('spinner');

function Spinner(props: SpinnerProps): JSX.Element {
  const { className = '', size, color, position } = props;
  let style = {
    color,
  } as Record<string, string>;

  if (position) {
    style = position.split(';').reduce((total, val, i) => {
      const obj = total;

      obj[i > 0 ? 'top' : 'left'] = val.trim();

      return obj;
    }, style);
  }

  if (position === 'center') {
    style.left = '50%';
    style.top = '50%';
  }

  return (
    <div role="progressbar" style={style} className={b({ size }).mix(className.split(' '))}></div>
  );
}

export default Spinner;

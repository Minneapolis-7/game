import React, { HTMLAttributes } from 'react';
import { block } from 'bem-cn';

type SpinnerProps = {
  className?: string;
  size?: SizeLabel;
  color?: string;
} & HTMLAttributes<HTMLDivElement>;

const b = block('spinner');

function Spinner(props: SpinnerProps): JSX.Element {
  const { className = '', size, color } = props;
  const style = {} as Record<string, string>;

  if (color) {
    style.color = color;
  }

  return (
    <div role="progressbar" style={style} className={b({ size }).mix(className.split(' '))}></div>
  );
}

export default Spinner;

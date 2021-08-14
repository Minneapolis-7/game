import React, { LabelHTMLAttributes } from 'react';
import { block } from 'bem-cn';

const b = block('filepick');

type FilepickProps = {
  className?: string;
  id: string;
  accept?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

function Filepick({ id, accept, className = '', children }: FilepickProps): JSX.Element {
  return (
    <label className={b({}).mix(className.split(' '))}>
      {children}
      <input
        className={b('input').mix('sr-only')}
        name={id}
        id={id}
        required
        accept={accept}
        type="file"
      />
      <span className={b('icon')}></span>
    </label>
  );
}

export default Filepick;

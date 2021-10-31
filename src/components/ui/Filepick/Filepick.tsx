import React, { InputHTMLAttributes } from 'react';
import { block } from 'bem-cn';

import { Icon } from '@/components/ui';

import pickFileSvg from 'bootstrap-icons/icons/pencil.svg';
import pickedFileSvg from 'bootstrap-icons/icons/pencil-fill.svg';

const b = block('filepick');

type FilepickProps = {
  inputClassName?: string;
  icon?: string;
  iconPopulated?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Filepick(props: FilepickProps): JSX.Element {
  const {
    className = '',
    inputClassName = '',
    icon = pickFileSvg.id,
    iconPopulated = pickedFileSvg.id,
    ...rest
  } = props;

  return (
    <label className={b({}).mix(className.split(' '))}>
      <input
        className={b('input').mix(['sr-only', ...inputClassName.split(' ')])}
        {...rest}
        required
        type="file"
      />
      <Icon className={b('icon')} name={icon} />
      <Icon className={b('icon', { populated: true })} name={iconPopulated} />
    </label>
  );
}

export default Filepick;

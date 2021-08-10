import React, { InputHTMLAttributes, forwardRef } from 'react';
import { block } from 'bem-cn';

import { InputBaseProps } from './types';

type InputProps = InputBaseProps & FieldBaseProps & InputHTMLAttributes<HTMLInputElement>;

const b = block('input');

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className = '',
    fieldClassName = '',
    theme = 'default',
    sizing = 'default',
    display,
    type = 'text',
    hint,
    isFloating = true,
    ...rest
  }: InputProps,
  ref
): JSX.Element {
  return (
    <div className={b({ theme, sizing }).mix(className.split(' '))} data-display={display}>
      <input
        ref={ref}
        className={b(
          'field',
          isFloating && hint && display !== 'inline' ? { mode: 'floating' } : {}
        ).mix(fieldClassName.split(' '))}
        type={type}
        {...rest}
        placeholder={hint}
      />
      {isFloating && hint && display !== 'inline' && (
        <label className={b('hint')} htmlFor={rest.id}>
          {hint}
        </label>
      )}
    </div>
  );
});

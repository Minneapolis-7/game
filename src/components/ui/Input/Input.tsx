import React, { forwardRef, InputHTMLAttributes } from 'react';
import { block } from 'bem-cn';

import { InputBaseProps } from './types';

export type InputProps = InputBaseProps & FieldBaseProps & InputHTMLAttributes<HTMLInputElement>;

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
    error,
    ...rest
  }: InputProps,
  ref
): JSX.Element {
  const canFloat = isFloating && hint && display !== 'inline';
  const mode = canFloat ? 'floating' : '';

  return (
    <div
      className={b({ theme, sizing })
        .has({ error: Boolean(error) })
        .mix(className.split(' '))}
      data-display={display}
    >
      <input
        ref={ref}
        className={b('field', { mode }).mix(fieldClassName.split(' '))}
        type={type}
        {...rest}
        placeholder={hint}
      />
      {error && (
        <div role="alert" className={b('error').mix('error')}>
          {error}
        </div>
      )}
      {canFloat && (
        <label className={b('hint')} htmlFor={rest.id}>
          {hint}
        </label>
      )}
    </div>
  );
});

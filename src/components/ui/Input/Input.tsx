import React, { forwardRef, InputHTMLAttributes } from 'react';
import { block } from 'bem-cn';

import { FieldBaseProps } from '@/components/ui/types/FieldBaseProps';

import { InputBaseProps } from './types';

export type InputProps = { htmlSize?: number } & InputBaseProps &
  FieldBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

const b = block('input');

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  props: InputProps,
  ref
): JSX.Element {
  const {
    className = '',
    fieldClassName = '',
    theme,
    size,
    htmlSize,
    display,
    type = 'text',
    hint,
    isFloating = true,
    error,
    ...rest
  } = props;
  const canFloat = isFloating && hint && display !== 'inline';
  const mode = canFloat ? 'floating' : '';

  return (
    <div
      className={b({ theme, size })
        .has({ error: Boolean(error) })
        .mix(className.split(' '))}
      data-display={display}
    >
      <input
        ref={ref}
        className={b('field', { mode }).mix(fieldClassName.split(' '))}
        type={type}
        size={htmlSize}
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

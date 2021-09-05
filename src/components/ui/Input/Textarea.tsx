import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { block } from 'bem-cn';

import { InputBaseProps } from './types';

export type TextareaProps = {
  // <textarea> не может менять свою высоту
  isFixed?: boolean;
} & Omit<InputBaseProps, 'isFloating'> &
  FieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const b = block('input');

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  props: TextareaProps,
  ref
): JSX.Element {
  const {
    className = '',
    fieldClassName = '',
    theme = 'default',
    sizing = 'default',
    display,
    hint,
    isFixed,
    error,
    ...rest
  } = props;

  return (
    <div
      className={b({ theme, sizing })
        .has({ error: Boolean(error) })
        .mix(className.split(' '))}
      data-display={display}
    >
      <textarea
        ref={ref}
        className={b('field').mix(fieldClassName.split(' '))}
        data-fixed={isFixed}
        {...rest}
        placeholder={hint}
      />
      {error && (
        <div role="alert" className={b('error').mix('error')}>
          {error}
        </div>
      )}
    </div>
  );
});

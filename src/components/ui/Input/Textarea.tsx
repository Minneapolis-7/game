import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { block } from 'bem-cn';

import { InputBaseProps } from './types';

type TextareaProps = {
  // <textarea> не может менять свою высоту
  isFixed?: boolean;
} & Omit<InputBaseProps, 'isFloating'> &
  FieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const b = block('input');

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className = '',
    fieldClassName = '',
    theme = 'default',
    sizing = 'default',
    display,
    hint,
    isFixed,
    ...rest
  }: TextareaProps,
  ref
): JSX.Element {
  return (
    <div className={b({ theme, sizing }).mix(className.split(' '))} data-display={display}>
      <textarea
        ref={ref}
        className={b('field').mix(fieldClassName.split(' '))}
        data-fixed={isFixed}
        {...rest}
        placeholder={hint}
      />
    </div>
  );
});

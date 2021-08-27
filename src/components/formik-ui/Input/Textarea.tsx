import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';
import { useField } from 'formik';

import OriginalTextarea, {
  TextareaProps as OriginalTextareaProps,
} from '@/components/ui/Input/Textarea';

type TextareaProps = FormikFieldBaseProps & OriginalTextareaProps;

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Input(
  { name, onChange, onBlur, ...rest }: TextareaProps,
  ref
): JSX.Element {
  const [field, meta] = useField(name);
  const { onChange: formikOnChange, onBlur: formikOnBlur } = field;
  const { error, touched } = meta;
  const finalOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }

    formikOnChange(e);
  };
  const finalOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e);
    }

    formikOnBlur(e);
  };

  return (
    <OriginalTextarea
      ref={ref}
      {...rest}
      {...field}
      onChange={finalOnChange}
      onBlur={finalOnBlur}
      error={touched && error ? error : undefined}
    />
  );
});

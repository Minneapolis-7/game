import React, { ChangeEvent, FocusEvent, forwardRef, useCallback } from 'react';
import { useField } from 'formik';

import OriginalInput, { InputProps as OriginalInputProps } from '@/components/ui/Input/Input';

type InputProps = FormikFieldBaseProps & OriginalInputProps;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, onChange, onBlur, ...rest }: InputProps,
  ref
): JSX.Element {
  const [field, meta] = useField(name);
  const { onChange: formikOnChange, onBlur: formikOnBlur } = field;
  const { error, touched } = meta;

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }

      formikOnChange(e);
    },
    [onChange, formikOnChange]
  );
  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }

      formikOnBlur(e);
    },
    [onBlur, formikOnBlur]
  );

  return (
    <OriginalInput
      ref={ref}
      {...rest}
      {...field}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      error={touched && error ? error : undefined}
    />
  );
});

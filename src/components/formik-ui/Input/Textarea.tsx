import React, { ChangeEvent, FocusEvent, forwardRef, useCallback } from 'react';
import { useField } from 'formik';

import OriginalTextarea, {
  TextareaProps as OriginalTextareaProps,
} from '@/components/ui/Input/Textarea';

type TextareaProps = FormikFieldBaseProps & OriginalTextareaProps;

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  props: TextareaProps,
  ref
): JSX.Element {
  const { name, onChange, onBlur, ...rest } = props;
  const [field, meta] = useField(name);
  const { onChange: formikOnChange, onBlur: formikOnBlur } = field;
  const { error, touched } = meta;

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }

      formikOnChange(e);
    },
    [onChange, formikOnChange]
  );
  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      if (onBlur) {
        onBlur(e);
      }

      formikOnBlur(e);
    },
    [onBlur, formikOnBlur]
  );

  return (
    <OriginalTextarea
      ref={ref}
      {...rest}
      {...field}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      error={touched && error ? error : undefined}
    />
  );
});

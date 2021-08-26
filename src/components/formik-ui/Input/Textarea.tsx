import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';
import { FastField, Field, FieldProps } from 'formik';

import OriginalTextarea, {
  TextareaProps as OriginalTextareaProps,
} from '@/components/ui/Input/Textarea';

type TextareaProps = FormikFieldBaseProps & OriginalTextareaProps;

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Input(
  { name, validate, fast = false, onChange, onBlur, ...rest }: TextareaProps,
  ref
): JSX.Element {
  const FinalField = fast ? FastField : Field;

  return (
    <FinalField name={name} validate={validate}>
      {(renderProps: FieldProps) => {
        const {
          field: { value = '', onChange: formikOnChange, onBlur: formikOnBlur },
          meta: { error, touched },
        } = renderProps;
        let errorMsg;
        const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
          if (onChange) {
            onChange(e);
          }

          formikOnChange(e);
        };
        const inputOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
          if (onBlur) {
            onBlur(e);
          }

          formikOnBlur(e);
        };

        if (touched && error) {
          errorMsg = error;
        }

        return (
          <OriginalTextarea
            ref={ref}
            {...rest}
            value={value}
            name={name}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            error={errorMsg}
          />
        );
      }}
    </FinalField>
  );
});

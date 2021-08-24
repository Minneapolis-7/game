import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';

import OriginalInput, { InputProps as OriginalInputProps } from 'components/ui/Input/Input';
import { FastField, Field, FieldProps } from 'formik';

type InputProps = FormikFieldBaseProps & OriginalInputProps;

// todo: как нормально типизировать `forwardRef`? вместо `HTMLInputElement` должно быть что-то типа `OriginalInput`,
// todo: но и `OriginalInput`, и `typeof OriginalInput` дают ошибки;
// todo: или это нормально и вообще не проблема?
export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, validate, fast = false, onChange, onBlur, ...rest }: InputProps,
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
        const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e);
          }

          formikOnChange(e);
        };
        const inputOnBlur = (e: FocusEvent<HTMLInputElement>) => {
          if (onBlur) {
            onBlur(e);
          }

          formikOnBlur(e);
        };

        if (touched && error) {
          errorMsg = error;
        }

        return (
          <OriginalInput
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

import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';

import Input from './Input';

describe('Input (formik wrapper)', () => {
  it('passes props down', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => undefined}>
        <Input name="test" data-test="test" />
      </Formik>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('data-test');
  });

  it('handles onChange and onBlur', async () => {
    let isOnChangeFired = false;
    let isOnBlurFired = false;

    render(
      <Formik
        initialValues={{
          test: '',
        }}
        onSubmit={() => undefined}
      >
        <Input
          name="test"
          onChange={() => {
            isOnChangeFired = true;
          }}
          onBlur={() => {
            isOnBlurFired = true;
          }}
        />
      </Formik>
    );

    await act(async () => {
      await fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'test',
        },
      });
      await fireEvent.blur(screen.getByRole('textbox'));
    });

    expect(isOnChangeFired).toBe(true);
    expect(isOnBlurFired).toBe(true);
  });
});

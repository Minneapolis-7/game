import React from 'react';
import { render, screen } from '@testing-library/react';

import { SizeLabels } from '@/shared/const/const';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('receives attributes', () => {
    render(<Spinner data-test="test" />);

    expect(screen.getByRole('progressbar')).toHaveAttribute('data-test');
  });

  it('applies proper class names', () => {
    render(<Spinner className="test" size={SizeLabels.XL} />);

    expect(screen.getByRole('progressbar')).toHaveClass(`spinner_size_${SizeLabels.XL} test`);
  });

  it('applies color', () => {
    const color = 'red';

    render(<Spinner color={color} />);

    expect(screen.getByRole('progressbar')).toHaveStyle(`color: ${color}`);
  });
});

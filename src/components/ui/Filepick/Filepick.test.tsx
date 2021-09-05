import React from 'react';
import { render, screen } from '@testing-library/react';

import Filepick from './Filepick';

describe('Filepick', () => {
  it('receives attributes', () => {
    render(<Filepick data-test="test" />);

    expect(screen.getByLabelText('')).toHaveAttribute('data-test');
  });

  it('applies class names', () => {
    const { container } = render(<Filepick className="test" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('test');
  });

  it('applies input class names', () => {
    render(<Filepick inputClassName="test" />);

    expect(screen.getByLabelText('')).toHaveClass('test');
  });
});

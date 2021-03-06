import React from 'react';
import { render, screen } from '@testing-library/react';

import { SizeLabels } from '@/shared/const/const';

import Input from './Input';

describe('Input', () => {
  it('renders text value', () => {
    render(<Input defaultValue="test" />);

    expect(screen.getByRole('textbox')).toHaveDisplayValue('test');
  });

  it('renders proper type', () => {
    render(<Input type="email" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('receives attributes', () => {
    render(<Input data-test="test" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-test');
  });

  it('handles display switching', () => {
    const { container } = render(<Input display="inline" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('data-display', 'inline');
  });

  it('applies proper class names', () => {
    const { container } = render(<Input className="test" theme="test" size={SizeLabels.XL} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass(
      `input input_theme_test input_size_${SizeLabels.XL} test`
    );
  });

  it('applies proper field class names', () => {
    render(<Input fieldClassName="test" />);

    expect(screen.getByRole('textbox')).toHaveClass('test');
  });

  it('applies placeholder', () => {
    render(<Input hint="test" />);

    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
  });

  it('applies floating hint', () => {
    render(<Input hint="test" id="test" />);

    expect(screen.getByLabelText('test')).toBeInTheDocument();
  });

  it('allows disabling floating hint', () => {
    render(<Input hint="test" id="test" isFloating={false} />);

    expect(screen.queryByLabelText('test')).not.toBeInTheDocument();
  });

  it('renders error', () => {
    render(<Input error="error" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

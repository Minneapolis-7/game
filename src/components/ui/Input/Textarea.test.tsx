import React from 'react';
import { render, screen } from '@testing-library/react';

import Input from '@/components/ui/Input/Input';
import { SizeLabels } from '@/shared/const/const';

import Textarea from './Textarea';

describe('Textarea', () => {
  it('renders text value', () => {
    render(<Textarea defaultValue="test" />);

    expect(screen.getByRole('textbox')).toHaveDisplayValue('test');
  });

  it('receives attributes', () => {
    render(<Textarea data-test="test" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-test');
  });

  it('handles display switching', () => {
    const { container } = render(<Textarea display="inline" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('data-display', 'inline');
  });

  it('applies proper class names', () => {
    const { container } = render(<Textarea className="test" theme="test" size={SizeLabels.XL} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass(
      `input input_theme_test input_size_${SizeLabels.XL} test`
    );
  });

  it('applies proper field class names', () => {
    render(<Textarea fieldClassName="test" />);

    expect(screen.getByRole('textbox')).toHaveClass('test');
  });

  it('applies placeholder', () => {
    render(<Textarea hint="test" />);

    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
  });

  it('applies fixed mode', () => {
    render(<Textarea hint="test" isFixed={true} />);

    expect(screen.getByPlaceholderText('test')).toHaveAttribute('data-fixed', 'true');
  });

  it('renders error', () => {
    render(<Input error="error" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

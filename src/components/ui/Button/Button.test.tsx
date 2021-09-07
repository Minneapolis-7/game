import React from 'react';
import { render, screen } from '@testing-library/react';

import { Icon } from '@/components/ui';

import Button from './Button';

import nextPageSvg from 'bootstrap-icons/icons/caret-right-fill.svg';

describe('Button', () => {
  it('renders text', () => {
    render(<Button>Text</Button>);

    expect(screen.getByRole('button', { name: /text/i })).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<Button icon={<Icon name={nextPageSvg.id} />} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('receives attributes', () => {
    render(<Button data-test="test" />);

    expect(screen.getByRole('button')).toHaveAttribute('data-test');
  });

  it('handles display switching', () => {
    render(<Button display="inline" />);

    expect(screen.getByRole('button')).toHaveAttribute('data-display', 'inline');
  });

  it('applies proper class names', () => {
    render(
      <Button className="test-button" theme="test" sizing="xl">
        Text
      </Button>
    );

    expect(screen.getByRole('button', { name: /text/i })).toHaveClass(
      'button button_theme_test button_sizing_xl test-button'
    );
  });

  it('applies waiting state', () => {
    render(<Button waiting={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('is-waiting');
  });
});

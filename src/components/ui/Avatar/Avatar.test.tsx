import React from 'react';
import { render, screen } from '@testing-library/react';

import Avatar from './Avatar';

describe('Avatar', () => {
  it('receives attributes', () => {
    render(<Avatar data-test="test" />);

    expect(screen.getByRole('figure')).toHaveAttribute('data-test');
  });

  it('applies proper class names', () => {
    render(<Avatar className="test" theme="test" populatable={true} />);

    expect(screen.getByRole('figure')).toHaveClass(
      'avatar avatar_theme_test avatar_populatable test'
    );
  });

  it('applies image src', () => {
    const src = 'test.jpg';

    render(<Avatar src={src} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', src);
  });

  it('designates populated state', () => {
    const src = 'test.jpg';

    render(<Avatar src={src} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('img').parentNode).toHaveAttribute('data-populated', 'true');
  });

  it('limits avatar width', () => {
    const size = '2em';

    render(<Avatar size={size} />);
    expect(screen.getByRole('figure')).toHaveStyle(`width: ${size}`);
  });

  it('applies proper aspect ratio', () => {
    render(<Avatar src="test.jpg" width="2em" height="1em" />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('img').parentNode).toHaveStyle('padding-top: 50%');
  });

  it('handles retina', () => {
    render(<Avatar src="test.jpg" retinaSuffix="@2x" />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('img').parentNode).toHaveClass('avatar__pic_retina');
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('img').parentNode).toHaveStyle('--at2x: url("test@2x.jpg")');
  });

  it('receives children', () => {
    render(
      <Avatar>
        <button>Test</button>
      </Avatar>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

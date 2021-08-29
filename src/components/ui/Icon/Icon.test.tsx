import React from 'react';
import { render, screen } from '@testing-library/react';

import Icon from './Icon';

import nextPageSvg from 'bootstrap-icons/icons/caret-right-fill.svg';

describe('Icon', () => {
  it('renders proper svg file', () => {
    render(<Icon name={nextPageSvg.id} className="test" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('img').firstChild).toHaveAttribute('href', `#${nextPageSvg.id}`);
  });

  it('receives attributes', () => {
    const { container } = render(<Icon name={nextPageSvg.id} data-test="test" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('data-test');
  });

  it('applies proper class names', () => {
    const { container } = render(<Icon name={nextPageSvg.id} className="test" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('icon test');
  });

  it('applies proper size', () => {
    const size = '2em';

    render(<Icon name={nextPageSvg.id} size={size} />);
    expect(screen.getByRole('img')).toHaveStyle(`width: ${size}; height: ${size}`);
  });

  it('applies proper scale', () => {
    const scale = 2;
    const { container } = render(<Icon name={nextPageSvg.id} scale={scale} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveStyle(`--scale: ${scale}`);
  });

  it('applies proper alignment', () => {
    const align = 'middle';
    const { container } = render(<Icon name={nextPageSvg.id} align={align} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveStyle(`vertical-align: ${align}`);
  });
});

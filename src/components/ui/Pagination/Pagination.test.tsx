import React from 'react';
import { render, screen } from '@testing-library/react';

import Pagination from './Pagination';

describe('Pagination', () => {
  it('applies class names', () => {
    render(<Pagination total={1} baseURL="/" className="test" />);

    expect(screen.getByRole('list')).toHaveClass('test');
  });

  it('applies base URL', () => {
    render(<Pagination total={2} current={2} baseURL="/test" />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/test/1');
  });

  // todo: дописать функционал компонента (limit и всё что с ним связано), и тесты на него
});

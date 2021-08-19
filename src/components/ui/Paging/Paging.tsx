import React from 'react';
import { block } from 'bem-cn';
import nextPageSvg from 'bootstrap-icons/icons/caret-right-fill.svg';
import prevPageSvg from 'bootstrap-icons/icons/caret-left-fill.svg';
import { Icon } from 'components/ui';

const b = block('paging');

type PagingProps = {
  className?: string;
  total: number; // всего страниц
  current?: number; // 1-based
  limit?: number; // todo: не показывать более `limit` элементов (стрелки не учитываются)
  baseURL: string;
};

function Paging({ className = '', total, current = 1, baseURL = '' }: PagingProps): JSX.Element {
  const nextIndex = current + 1;
  const prevIndex = current - 1;
  const hasNext = nextIndex <= total;
  const hasPrev = prevIndex > 0;

  return (
    <ul className={b({}).mix([...className.split(' '), 'nolist'])}>
      {new Array(total).fill(1).map((_val, i, _arr) => {
        const humanizedIndex = i + 1;
        const isCurrent = current === humanizedIndex;

        return (
          <li key={i} className={b('item', { current: isCurrent })}>
            {React.createElement(
              isCurrent ? 'span' : 'a',
              {
                className: b('handle'),
                ...(!isCurrent && { href: `${baseURL}/${humanizedIndex}` }),
              },
              humanizedIndex
            )}
          </li>
        );
      })}
      <li className={b('item', { disabled: !hasPrev })}>
        {React.createElement(
          hasPrev ? 'a' : 'span',
          {
            className: b('handle'),
            ...(hasPrev && { href: `${baseURL}/${prevIndex}`, title: 'Предыдущая страница' }),
          },
          <Icon name={prevPageSvg.id} />
        )}
      </li>
      <li className={b('item', { disabled: !hasNext })}>
        {React.createElement(
          hasNext ? 'a' : 'span',
          {
            className: b('handle'),
            ...(hasNext && { href: `${baseURL}/${nextIndex}`, title: 'Следующая страница' }),
          },
          <Icon name={nextPageSvg.id} />
        )}
      </li>
    </ul>
  );
}

export default Paging;

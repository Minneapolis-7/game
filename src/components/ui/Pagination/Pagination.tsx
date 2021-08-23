import React, { PropsWithChildren } from 'react';
import { BemMods, block } from 'bem-cn';
import nextPageSvg from 'bootstrap-icons/icons/caret-right-fill.svg';
import prevPageSvg from 'bootstrap-icons/icons/caret-left-fill.svg';
import { Icon } from '@/components/ui';

const b = block('pagination');

type PaginationItemProps = PropsWithChildren<{
  href?: string;
  title?: string;
  mod?: string | BemMods; // второй аргумент для `b()`: https://github.com/albburtsev/bem-cn#api
}>;

function PaginationItem({ children, href, title, mod = '' }: PaginationItemProps): JSX.Element {
  const tagBaseProps = {
    className: b('handle'),
    children,
    title,
  };

  return (
    <li className={b('item', mod)}>
      {href ? <a href={href} {...tagBaseProps} /> : <span {...tagBaseProps} />}
    </li>
  );
}

type PaginationProps = {
  className?: string;
  total: number; // всего страниц
  current?: number; // 1-based
  limit?: number; // todo: не показывать более `limit` элементов (стрелки не учитываются)
  baseURL: string;
};

function Pagination({
  className = '',
  total,
  current = 1,
  baseURL = '',
}: PaginationProps): JSX.Element {
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
          <PaginationItem
            key={i}
            href={isCurrent ? undefined : `${baseURL}/${humanizedIndex}`}
            mod={{ current: isCurrent }}
          >
            {humanizedIndex}
          </PaginationItem>
        );
      })}
      <PaginationItem
        href={hasPrev ? `${baseURL}/${prevIndex}` : undefined}
        title={hasPrev ? 'Предыдущая страница' : undefined}
        mod={{ disabled: !hasPrev }}
      >
        <Icon name={prevPageSvg.id} />
      </PaginationItem>
      <PaginationItem
        href={hasNext ? `${baseURL}/${nextIndex}` : undefined}
        title={hasNext ? 'Следующая страница' : undefined}
        mod={{ disabled: !hasNext }}
      >
        <Icon name={nextPageSvg.id} />
      </PaginationItem>
    </ul>
  );
}

export default Pagination;

import React, { PropsWithChildren } from 'react';
import { BemMods, block } from 'bem-cn';

import { Icon } from '@/components/ui';
import text from '@/shared/const/text';

import prevPageSvg from 'bootstrap-icons/icons/caret-left-fill.svg';
import nextPageSvg from 'bootstrap-icons/icons/caret-right-fill.svg';

const b = block('pagination');
const { pagination: txt } = text;

type PaginationItemProps = PropsWithChildren<{
  href?: string;
  title?: string;
  mod?: string | BemMods; // второй аргумент для `b()`: https://github.com/albburtsev/bem-cn#api
}>;

function PaginationItem(props: PaginationItemProps): JSX.Element {
  const { children, href, title, mod = '' } = props;
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

function Pagination(props: PaginationProps): JSX.Element {
  const { className = '', total, current = 1, baseURL = '' } = props;
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
        title={hasPrev ? txt.prevPageButtonTitle : undefined}
        mod={{ disabled: !hasPrev }}
      >
        <Icon name={prevPageSvg.id} />
      </PaginationItem>
      <PaginationItem
        href={hasNext ? `${baseURL}/${nextIndex}` : undefined}
        title={hasNext ? txt.nextPageButtonTitle : undefined}
        mod={{ disabled: !hasNext }}
      >
        <Icon name={nextPageSvg.id} />
      </PaginationItem>
    </ul>
  );
}

export default Pagination;

import React, { ReactNode } from 'react';
import { block } from 'bem-cn';

const b = block('forum-item-preview');

type ForumItemPreviewProps = {
  className?: string;
  descSlot?: ReactNode;
  statSlot?: ReactNode;
};

function ForumItemPreview({
  descSlot,
  statSlot,
  className = '',
}: ForumItemPreviewProps): JSX.Element {
  return (
    <article className={b({}).mix(className.split(' '))}>
      <div className={b('slot', { desc: true })}>{descSlot}</div>
      <div className={b('slot', { stat: true })}>{statSlot}</div>
    </article>
  );
}

export default ForumItemPreview;

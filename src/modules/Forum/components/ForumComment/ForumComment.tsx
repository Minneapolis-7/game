import React, { PropsWithChildren, useMemo } from 'react';
import { block } from 'bem-cn';
import { formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { Avatar, Button, Icon } from 'components/ui';
import editSvg from 'bootstrap-icons/icons/pencil.svg';
import deleteSvg from 'bootstrap-icons/icons/x-lg.svg';
import replySvg from 'bootstrap-icons/icons/reply.svg';
import bookmarkSvg from 'bootstrap-icons/icons/bookmark.svg';

const b = block('forum-comment');
const bLink = block('link');

type ForumCommentProps = PropsWithChildren<{
  className?: string;
  data: any; // todo: типизировать
}>;

function ForumComment({ data, className = '' }: ForumCommentProps): JSX.Element {
  const { user, content, date } = data;

  const dateDistanceText = useMemo(
    () =>
      `${formatDistance(new Date(date), Date.now(), {
        locale: ruLocale,
      })} назад`,
    [date]
  );

  return (
    <article className={b({}).mix(className.split(' '))}>
      <div className={b('user')}>
        <div className={b('user-name')}>
          <a className={bLink({ action: true })} href={`/profile/${user.id}`}>
            {user.displayName}
          </a>
        </div>
        <Avatar size="8rem" className={b('user-pic')} />
      </div>
      <div className={b('content')}>
        <div className={b('toolbar')}>
          <a className={bLink({ 'text-like': true })} href="#">
            <Icon align="middle" name={bookmarkSvg.id} /> {dateDistanceText}
          </a>{' '}
          <Button
            display="inline"
            title="Редактировать"
            sizing="sm"
            theme="subtle"
            icon={<Icon name={editSvg.id} />}
          />
          <Button
            display="inline"
            title="Удалить"
            sizing="sm"
            theme="subtle"
            icon={<Icon name={deleteSvg.id} />}
          />
        </div>
        {content}
        <div className={b('toolbar')}>
          <Button display="inline" theme="link" icon={<Icon size="1.2em" name={replySvg.id} />}>
            Ответить
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ForumComment;

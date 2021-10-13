import React, { PropsWithChildren, useMemo } from 'react';
import { generatePath } from 'react-router';
import { block } from 'bem-cn';
import { formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { Avatar, Button, Icon } from '@/components/ui';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import { ForumCommentData, ForumThreadData } from '@/shared/types/types';
import getResourceURL from '@/shared/utils/getResourceURL';
import { useAppSelector } from '@/store/store';

import bookmarkSvg from 'bootstrap-icons/icons/bookmark.svg';
import editSvg from 'bootstrap-icons/icons/pencil.svg';
import deleteSvg from 'bootstrap-icons/icons/x-lg.svg';

const b = block('forum-comment');
const bEmojer = block('emojer');
const bLink = block('link');
const { forum: txt } = text;

type ForumCommentProps = PropsWithChildren<{
  className?: string;
  data: ForumCommentData | ForumThreadData;
}>;

function ForumComment({ data, className = '' }: ForumCommentProps): JSX.Element {
  const { user, content, createdAt } = data;
  const authorizedUser = useAppSelector((state) => state.user);
  const isOwnComment = authorizedUser.id === user.id;
  let userPath = generatePath(paths.PROFILE);
  const dateDistanceText = useMemo(
    () =>
      `${formatDistance(new Date(createdAt), Date.now(), {
        locale: ruLocale,
      })} назад`,
    [createdAt]
  );
  const commentAnchor = `#comment-${data.id}`;

  if (!isOwnComment) {
    userPath = generatePath(paths.PROFILE, {
      userId: user.id,
    });
  }

  return (
    <article id={commentAnchor} className={b({}).mix(className.split(' '))}>
      <div className={b('user')}>
        <div className={b('user-name')}>
          <a className={bLink({ action: true })} href={userPath}>
            {user.name}
          </a>
        </div>
        <Avatar
          src={user.avatar && getResourceURL(user.avatar)}
          size="8rem"
          className={b('user-pic')}
        />
      </div>
      <div className={b('content')}>
        <div className={b('toolbar', { top: true })}>
          <a className={bLink({ 'text-like': true })} href={commentAnchor}>
            <Icon align="middle" name={bookmarkSvg.id} /> {dateDistanceText}
          </a>{' '}
          {/* todo: сделать редактирование и удаление */}
          {isOwnComment && (
            <>
              <Button
                display="inline"
                title={txt.commentEditButtonTitle}
                sizing="sm"
                theme="subtle"
                icon={<Icon name={editSvg.id} />}
              />
              <Button
                display="inline"
                title={txt.commentDeleteButtonTitle}
                sizing="sm"
                theme="subtle"
                icon={<Icon name={deleteSvg.id} />}
              />
            </>
          )}
        </div>
        {content}
        <div className={b('toolbar', { bottom: true })}>
          {/* todo: добавить реплаи (древовидные) */}
          <div className={b('emojis').mix(bEmojer())}>
            <Button
              data-code="1F44D"
              className={bEmojer('emoji')}
              display="inline"
              title={txt.postThumbsUpTitle}
              sizing="sm"
              theme="subtle"
            >
              👍
            </Button>
            <Button
              data-code="1F44E"
              className={bEmojer('emoji', { chosen: true })}
              display="inline"
              title={txt.postThumbsDownTitle}
              sizing="sm"
              theme="subtle"
            >
              3 👎
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ForumComment;

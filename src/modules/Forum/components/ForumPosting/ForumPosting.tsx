import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { generatePath } from 'react-router';
import { block } from 'bem-cn';
import { formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import AppContext from '@/AppContext';
import { Avatar, Button, Icon } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import { ForumCommentData, ForumThreadData } from '@/shared/types/types';
import translateErrorMessage from '@/shared/utils';
import getResourceURL from '@/shared/utils/getResourceURL';
import htmlDecode from '@/shared/utils/htmlDecode';
import {
  addCommentEmoji,
  addThreadEmoji,
  deleteCommentEmoji,
  deleteThreadEmoji,
} from '@/store/reducers/actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

import bookmarkSvg from 'bootstrap-icons/icons/bookmark.svg';
import editSvg from 'bootstrap-icons/icons/pencil.svg';
import deleteSvg from 'bootstrap-icons/icons/x-lg.svg';

const b = block('forum-posting');
const bEmojer = block('emojer');
const bLink = block('link');
const { forum: txt } = text;

type PostingData = ForumCommentData | ForumThreadData;
type ForumPostingProps = PropsWithChildren<{
  className?: string;
  data: PostingData;
  isOriginal?: boolean; // разграничивает обычные комментарии, и первичное сообщение треда
}>;

function checkIfComment(data: PostingData): data is ForumCommentData {
  return 'threadId' in data;
}

function ForumPosting({ data, className = '' }: ForumPostingProps): JSX.Element {
  const dispatch = useAppDispatch();
  const appContext = useContext(AppContext);
  const { user, content, createdAt } = data;
  const authorizedUser = useAppSelector((state) => state.user);
  const availableEmojis = useAppSelector((state) => state.forum.availableEmojis);
  const isOwnPosting = authorizedUser.id === user.id;
  const isComment = checkIfComment(data);
  let userPath = generatePath(paths.PROFILE);
  const dateDistanceText = useMemo(
    () =>
      `${formatDistance(new Date(createdAt), Date.now(), {
        locale: ruLocale,
      })} назад`,
    [createdAt]
  );
  const postAnchor = `#post-${isComment ? data.id : 'original'}`;
  const [emojiToggleState, setEmojiToggleState] = useState({} as Record<string, boolean>);
  const getPostEmojiId = useCallback(
    (emojiId: number): string => `${isComment ? 'comment' : 'thread'}-${emojiId}-${data.id}`,
    [isComment, data.id]
  );
  const toggleVote = useCallback(
    async (e) => {
      const { voted, id } = e.target.dataset;
      const basePayload = {
        emojiId: Number(id),
        userId: authorizedUser.id!,
      };

      e.target.toggleAttribute('data-voted');
      setEmojiToggleState({
        ...emojiToggleState,
        [getPostEmojiId(id)]: true,
      });

      try {
        if (isComment) {
          const payload = {
            ...basePayload,
            commentId: data.id,
          };
          const dispatchedAction = voted
            ? dispatch(deleteCommentEmoji(payload))
            : dispatch(addCommentEmoji(payload));

          await dispatchedAction;
        } else {
          const payload = {
            ...basePayload,
            threadId: data.id,
          };
          const dispatchedAction = voted
            ? dispatch(deleteThreadEmoji(payload))
            : dispatch(addThreadEmoji(payload));

          await dispatchedAction;
        }
      } catch (err) {
        const toast = {
          type: 'warning',
          description: translateErrorMessage(err.message),
        };

        e.target.toggleAttribute('data-voted');
        appContext?.addToastMessage(toast as ToastItem);
      } finally {
        setEmojiToggleState({
          ...emojiToggleState,
          [getPostEmojiId(id)]: false,
        });
      }
    },
    [appContext, authorizedUser.id, data.id, dispatch, isComment, emojiToggleState, getPostEmojiId]
  );

  if (!isOwnPosting) {
    userPath = generatePath(paths.PROFILE, {
      userId: user.id,
    });
  }

  return (
    <article id={postAnchor} className={b({}).mix(className.split(' '))}>
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
          <a className={bLink({ 'text-like': true })} href={postAnchor}>
            <Icon align="middle" name={bookmarkSvg.id} /> {dateDistanceText}
          </a>{' '}
          {/* todo: сделать редактирование и удаление */}
          {isOwnPosting && (
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
          {availableEmojis.length && (
            <div className={b('emojis').mix(bEmojer())}>
              {availableEmojis.map((availableEmoji) => {
                const emoji = data.emojis.find(
                  (appliedEmoji) => appliedEmoji.id === availableEmoji.id
                );
                const voteCount = emoji?.users.length;

                const isVoted = Boolean(
                  emoji?.users.find((emojiUser) => emojiUser.id === authorizedUser.id)
                );

                return (
                  <Button
                    key={availableEmoji.id}
                    data-id={availableEmoji.id}
                    data-code={availableEmoji.utfCode}
                    data-voted={isVoted || null}
                    data-populated={voteCount || null}
                    className={bEmojer('emoji')}
                    display="inline"
                    sizing="sm"
                    theme="subtle"
                    onClick={toggleVote}
                    waiting={emojiToggleState[getPostEmojiId(availableEmoji.id)]}
                  >
                    {voteCount || ''} {htmlDecode(`&#${availableEmoji.htmlEntityCode};`)}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ForumPosting;

import React from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import { Icon } from '@/components/ui';
import { ForumItemPreview, UserStamp } from '@/modules/Forum/components';
import { SizeLabels } from '@/shared/const/const';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import truncateString from '@/shared/utils/truncateString';
import { useAppSelector } from '@/store/store';

import backSvg from 'bootstrap-icons/icons/caret-left.svg';
import addNewThreadSvg from 'bootstrap-icons/icons/plus-lg.svg';

const b = block('forum');
const bLink = block('link');

const { forum: txt } = text;

function ForumSection(): JSX.Element | null {
  const sectionData = useAppSelector((state) => state.forum.section);
  const userData = useAppSelector((state) => state.user);

  if (!sectionData) {
    return null;
  }

  const createThreadPath = generatePath(paths.FORUM_THREAD_CREATE, {
    sectionId: sectionData.id,
    threadId: 'create',
  });

  return (
    <>
      <h4 className={b('heading').mix('heading_4', 'heading')}>
        <Link
          to={paths.FORUM}
          component={getRoutedButtonLink({
            title: txt.backToForumButtonTitle,
            size: SizeLabels.MD,
            icon: <Icon scale={1.4} name={backSvg.id} />,
            theme: 'subtle',
            className: b('heading-action', { shifted: true }),
          })}
        />
        <span className={b('heading-txt')}>{sectionData.title}</span>
        <Link
          to={createThreadPath}
          component={getRoutedButtonLink({
            title: txt.createNewThreadButtonTitle,
            size: SizeLabels.SM,
            children: <Icon name={addNewThreadSvg.id} />,
            theme: 'circle',
            className: b('heading-action'),
          })}
        />
      </h4>
      {/* todo: добавить пагинацию */}
      <div className={b('page')}>
        {!sectionData.threads.length && (
          <div className={b('empty-message')}>{txt.emptySectionMessage}</div>
        )}
        {sectionData.threads.map((thread) => {
          const lastComment = thread.comments[0];
          const lastPost = lastComment || thread;
          const threadPath = generatePath(paths.FORUM_THREAD, {
            sectionId: sectionData.id,
            threadId: thread.id,
          });
          const threadAuthorPath =
            userData.id === thread.userId
              ? generatePath(paths.PROFILE)
              : generatePath(paths.PROFILE, {
                  userId: thread.userId,
                });
          const lastPostPath = lastComment
            ? generatePath(paths.FORUM_COMMENT, {
                sectionId: sectionData.id,
                threadId: thread.id,
                commentId: lastComment.id,
              })
            : generatePath(paths.FORUM_THREAD, {
                sectionId: sectionData.id,
                threadId: thread.id,
              });
          const lastPostAuthorPath =
            userData.id === lastPost.userId
              ? generatePath(paths.PROFILE)
              : generatePath(paths.PROFILE, {
                  userId: lastPost.userId,
                });

          return (
            <ForumItemPreview
              key={thread.id}
              className={b('section')}
              descSlot={
                <>
                  <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                    <a className={bLink()} href={threadPath}>
                      {thread.title}
                    </a>{' '}
                    <span className={b('item-heading-misc')}>
                      {/* todo: добавить количество просмотров и комментариев */}
                    </span>
                  </h4>
                  <UserStamp
                    profileURL={threadAuthorPath}
                    user={thread.user.name}
                    date={new Date(thread.createdAt)}
                  />
                </>
              }
              statSlot={
                <>
                  <a className={bLink({ action: true })} href={lastPostPath}>
                    {truncateString(lastPost.content, 70)}
                  </a>{' '}
                  <UserStamp
                    profileURL={lastPostAuthorPath}
                    user={lastPost.user.name}
                    date={new Date(lastPost.createdAt)}
                  />
                </>
              }
            />
          );
        })}
      </div>
      {/* todo: добавить пагинацию */}
    </>
  );
}

export default ForumSection;

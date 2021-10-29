import React from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import { ForumItemPreview, UserStamp } from '@/modules/Forum/components';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import { useAppSelector } from '@/store/store';

const b = block('forum');
const bLink = block('link');

const { forum: txt } = text;

function ForumMainView(): JSX.Element {
  const categoriesData = useAppSelector((state) => state.forum.categories);
  const userData = useAppSelector((state) => state.user);

  return (
    <>
      {categoriesData.map((category) => (
        <div key={category.id} className={b('category')}>
          <h3 className={b('heading').mix('heading_3', 'heading')}>{category.title}</h3>
          {category.sections.map((section) => {
            const sectionPath = generatePath(paths.FORUM_SECTION, {
              sectionId: section.id,
            });

            const lastActiveThread = section.threads && section.threads[0];
            let sectionStats = txt.emptyCategoryMsg;

            if (lastActiveThread) {
              const lastComment = lastActiveThread.comments && lastActiveThread.comments[0];
              const lastActivePosting = lastComment || lastActiveThread;
              const lastActiveUser = lastActivePosting.user;

              const lastActiveUserPath =
                userData.id === lastActiveUser.id
                  ? generatePath(paths.PROFILE)
                  : generatePath(paths.PROFILE, {
                      userId: lastActiveUser.yandexUserId,
                    });
              const lastActivePostingPath = lastComment
                ? generatePath(paths.FORUM_COMMENT, {
                    sectionId: section.id,
                    threadId: lastActiveThread.id,
                    commentId: lastComment.id,
                  })
                : generatePath(paths.FORUM_THREAD, {
                    sectionId: section.id,
                    threadId: lastActiveThread.id,
                  });

              sectionStats = (
                <>
                  <Link className={bLink({ action: true })} to={lastActivePostingPath}>
                    {lastActiveThread.title}
                  </Link>{' '}
                  <UserStamp
                    profileURL={lastActiveUserPath}
                    user={lastActiveUser.name}
                    date={new Date(lastActivePosting.createdAt)}
                  />
                </>
              );
            }

            return (
              <ForumItemPreview
                key={section.id}
                className={b('section').has({ 'no-threads': !lastActiveThread })}
                descSlot={
                  <>
                    <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                      <Link className={bLink()} to={sectionPath}>
                        {section.title}
                      </Link>
                    </h4>
                    <p>{section.description}</p>
                  </>
                }
                statSlot={sectionStats}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default ForumMainView;

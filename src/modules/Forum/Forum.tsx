import React, { useCallback, useLayoutEffect } from 'react';
import { generatePath, useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input, Textarea } from '@/components/formik-ui';
import { Button, Icon, Spinner } from '@/components/ui';
import ForumComment from '@/modules/Forum/components/ForumComment';
import ForumItemPreview from '@/modules/Forum/components/ForumItemPreview';
import UserStamp from '@/modules/Forum/components/UserStamp';
import { createThreadSchema, replySchema } from '@/modules/Forum/schema';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import truncateString from '@/shared/utils/truncateString';
import {
  createComment,
  createThread,
  getCategories,
  getSection,
  getThread,
} from '@/store/reducers/actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

import backSvg from 'bootstrap-icons/icons/caret-left.svg';
import addNewThreadSvg from 'bootstrap-icons/icons/plus-lg.svg';

const b = block('forum');
const bLink = block('link');

const { forum: txt } = text;

type ForumRouteParams = {
  sectionId?: string;
  threadId?: string;
};

function Forum(): JSX.Element {
  const { sectionId, threadId } = useParams<ForumRouteParams>();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isMainPage = !sectionId && !threadId;
  const isSectionPage = Boolean(sectionId) && !threadId;
  const isThreadPage = Boolean(threadId);
  const isThreadCreatePage = threadId === 'create';

  const isLoading = useAppSelector((state) => state.forum.isLoading);
  const isLoaded = useAppSelector((state) => state.forum.isLoaded);
  const categoriesData = useAppSelector((state) => state.forum.categories);
  const statsData = useAppSelector((state) => state.forum.stats);
  const sectionData = useAppSelector((state) => state.forum.section);
  const threadData = useAppSelector((state) => state.forum.thread);
  const userData = useAppSelector((state) => state.user);

  let forumBody;

  useLayoutEffect(() => {
    if (isMainPage) {
      dispatch(getCategories());
    }

    if (sectionId) {
      dispatch(getSection(Number(sectionId)));
    }

    if (threadId && !isThreadCreatePage) {
      dispatch(getThread(Number(threadId)));
    }
  }, [isMainPage, isSectionPage, isThreadPage, isThreadCreatePage, sectionId, threadId, dispatch]);

  if (isMainPage) {
    forumBody = categoriesData.map((category) => (
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
                <a className={bLink({ action: true })} href={lastActivePostingPath}>
                  {lastActiveThread.title}
                </a>{' '}
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
                    <a className={bLink()} href={sectionPath}>
                      {section.title}
                    </a>
                  </h4>
                  <p>{section.description}</p>
                </>
              }
              statSlot={sectionStats}
            />
          );
        })}
      </div>
    ));
  }

  if (isSectionPage && sectionData) {
    const createThreadPath = generatePath(paths.FORUM_THREAD_CREATE, {
      sectionId: sectionData.id,
      threadId: 'create',
    });

    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <Link
            to={paths.FORUM}
            component={getRoutedButtonLink({
              title: txt.backToForumButtonTitle,
              sizing: 'md',
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
              sizing: 'sm',
              children: <Icon name={addNewThreadSvg.id} />,
              theme: 'circle',
              className: b('heading-action'),
            })}
          />
        </h4>
        {/* todo: добавить пагинацию */}
        <div className={b('page')}>
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

  const submitNewComment = useCallback(
    (values, actions) => {
      if (!threadData) {
        return;
      }

      (async () => {
        actions.setFieldValue('replyMessage', '', false);

        await dispatch(
          createComment({
            userId: userData.id as number,
            threadId: threadData.id,
            content: values.replyMessage,
          })
        ).unwrap();

        actions.setSubmitting(false);
      })();
    },
    [dispatch, userData.id, threadData]
  );

  if (isThreadPage && threadData && sectionData) {
    const replyInitialValues = {
      replyMessage: '',
    };
    const parentSectionPath = generatePath(paths.FORUM_SECTION, {
      sectionId: sectionData.id,
    });

    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <Link
            to={parentSectionPath}
            component={getRoutedButtonLink({
              title: txt.backToSectionButtonTitle,
              sizing: 'md',
              icon: <Icon scale={1.4} name={backSvg.id} />,
              theme: 'subtle',
              className: b('heading-action', { shifted: true }),
            })}
          />{' '}
          <span className={b('heading-txt')}>{threadData.title}</span>
        </h4>
        {/* todo: добавить пагинацию */}
        <div className={b('page')}>
          <ForumComment className={b('comment', { original: true })} data={threadData} />
          {threadData.comments.map((comment) => (
            <ForumComment key={comment.id} className={b('comment')} data={comment} />
          ))}
        </div>
        {/* todo: добавить пагинацию */}
        <Formik
          initialValues={replyInitialValues}
          validationSchema={replySchema}
          onSubmit={submitNewComment}
        >
          {({ isSubmitting }) => (
            <Form noValidate className={b('reply')}>
              <Textarea
                required
                className="gap-y-lg"
                theme="solid"
                name="replyMessage"
                hint={txt.newMessageAreaPlaceholder}
                rows={10}
              />
              <Button type="submit" waiting={isSubmitting}>
                {txt.newMessageButton}
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  const submitNewThread = useCallback(
    (values, actions) => {
      if (!sectionData) {
        return;
      }

      (async () => {
        actions.setFieldValue('threadHeader', '', false);
        actions.setFieldValue('threadMessage', '', false);

        const newThread = await dispatch(
          createThread({
            userId: userData.id as number,
            sectionId: sectionData.id,
            title: values.threadHeader,
            content: values.threadMessage,
          })
        ).unwrap();

        actions.setSubmitting(false);
        history.push(
          generatePath(paths.FORUM_THREAD, {
            sectionId: newThread.sectionId,
            threadId: newThread.id,
          })
        );
      })();
    },
    [history, dispatch, userData.id, sectionData]
  );

  if (isThreadCreatePage && sectionData) {
    const createThreadInitialValues = {
      threadHeader: '',
      threadMessage: '',
    };

    const parentSectionPath = generatePath(paths.FORUM_SECTION, {
      sectionId: sectionData.id,
    });

    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <Link
            to={parentSectionPath}
            component={getRoutedButtonLink({
              title: txt.backToSectionButtonTitle,
              sizing: 'md',
              icon: <Icon scale={1.4} name={backSvg.id} />,
              theme: 'subtle',
              className: b('heading-action', { shifted: true }),
            })}
          />{' '}
          <span className={b('heading-txt')}>{sectionData.title}</span>
        </h4>

        <h5 className="gap-y-gen heading_5 heading">{txt.newThreadHeader}</h5>
        <Formik
          initialValues={createThreadInitialValues}
          validationSchema={createThreadSchema}
          onSubmit={submitNewThread}
        >
          {({ isSubmitting }) => (
            <Form noValidate className={b('create-thread')}>
              <Input
                required
                className="gap-y-lg"
                theme="solid"
                name="threadHeader"
                hint={txt.newThreadNameInputPlaceholder}
                isFloating={false}
              />
              <Textarea
                required
                className="gap-y-lg"
                theme="solid"
                name="threadMessage"
                hint={txt.newThreadMessageAreaPlaceholder}
                rows={10}
              />
              <Button type="submit" waiting={isSubmitting}>
                {txt.newThreadButton}
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  return (
    <div className={b()}>
      <header className={b('header')}>
        <h1 className={b('main-heading').mix('heading_1', 'heading')}>
          <a className={bLink({ 'text-like': true })} href={paths.FORUM}>
            Game
          </a>
        </h1>
      </header>
      <main className={b('body').is({ loading: isLoading, loaded: isLoaded })}>
        <Spinner className={b('spinner')} size="lg" />
        <div className={b('content')}>{forumBody}</div>
      </main>
      <footer className={b('footer')}>
        <div className={b('footer-stat', { registered: true })}>
          {txt.stats.registered} {statsData?.registeredCount}
        </div>
        {/* todo: добавить список юзеров онлайн */}
      </footer>
    </div>
  );
}

export default Forum;

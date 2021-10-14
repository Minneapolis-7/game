import React, { useCallback } from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Textarea } from '@/components/formik-ui';
import { Button, Icon } from '@/components/ui';
import { ForumPosting } from '@/modules/Forum/components';
import { replySchema } from '@/modules/Forum/schema';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import { createComment } from '@/store/reducers/forumReducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

import backSvg from 'bootstrap-icons/icons/caret-left.svg';

const b = block('forum');

const { forum: txt } = text;

function ForumThread(): JSX.Element | null {
  const sectionData = useAppSelector((state) => state.forum.section);
  const threadData = useAppSelector((state) => state.forum.thread);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
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

  if (!sectionData || !threadData) {
    return null;
  }

  const replyInitialValues = {
    replyMessage: '',
  };
  const parentSectionPath = generatePath(paths.FORUM_SECTION, {
    sectionId: sectionData.id,
  });

  return (
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
        <ForumPosting
          className={b('posting', { original: true })}
          isOriginal={true}
          data={threadData}
        />
        {threadData.comments.map((comment) => (
          <ForumPosting key={comment.id} className={b('posting')} data={comment} />
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

export default ForumThread;

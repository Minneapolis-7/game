import React, { useCallback } from 'react';
import { generatePath } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input, Textarea } from '@/components/formik-ui';
import { Button, Icon } from '@/components/ui';
import { createThreadSchema } from '@/modules/Forum/schema';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import { createThread } from '@/store/reducers/forumReducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

import backSvg from 'bootstrap-icons/icons/caret-left.svg';

const b = block('forum');

const { forum: txt } = text;

function ForumCreateThread(): JSX.Element | null {
  const sectionData = useAppSelector((state) => state.forum.section);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const history = useHistory();
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

  if (!sectionData) {
    return null;
  }

  const createThreadInitialValues = {
    threadHeader: '',
    threadMessage: '',
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
              autoFocus
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

export default ForumCreateThread;

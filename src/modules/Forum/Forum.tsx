import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { block } from 'bem-cn';

import { Spinner } from '@/components/ui';
import {
  ForumCreateThread,
  ForumMainView,
  ForumSectionView,
  ForumThreadView,
} from '@/modules/Forum/modules';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import { getCategories, getSection, getThread } from '@/store/reducers/actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

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

  const isMainPage = !sectionId && !threadId;
  const isSectionPage = Boolean(sectionId) && !threadId;
  const isThreadPage = Boolean(threadId);
  const isThreadCreatePage = threadId === 'create';

  const isLoading = useAppSelector((state) => state.forum.isLoading);
  const isLoaded = useAppSelector((state) => state.forum.isLoaded);
  const statsData = useAppSelector((state) => state.forum.stats);

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
    forumBody = <ForumMainView />;
  }

  if (isSectionPage) {
    forumBody = <ForumSectionView />;
  }

  if (isThreadPage) {
    forumBody = <ForumThreadView />;
  }

  if (isThreadCreatePage) {
    forumBody = <ForumCreateThread />;
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
        {isLoading ? <Spinner className={b('spinner')} size="lg" /> : forumBody}
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

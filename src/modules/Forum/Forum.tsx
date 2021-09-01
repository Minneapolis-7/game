import React, { useCallback } from 'react';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input, Textarea } from '@/components/formik-ui';
import { Button, ButtonLink, Icon, Pagination } from '@/components/ui';
import ForumComment from '@/modules/Forum/components/ForumComment';
import ForumItemPreview from '@/modules/Forum/components/ForumItemPreview';
import UserStamp from '@/modules/Forum/components/UserStamp';
import { createThreadSchema, replySchema } from '@/modules/Forum/schema';
import text from '@/shared/const/text';

import backSvg from 'bootstrap-icons/icons/caret-left.svg';
import commentCountSvg from 'bootstrap-icons/icons/chat-square.svg';
import viewCountSvg from 'bootstrap-icons/icons/eye.svg';
import addNewThreadSvg from 'bootstrap-icons/icons/plus-lg.svg';

const b = block('forum');
const bLink = block('link');

const createThreadInitialValues = {
  topic: '',
  message: '',
};

const replyInitialValues = {
  replyMessage: '',
};

type ForumProps = {
  section?: string; // id выбранной секции
  thread?: string; // id выбранного треда
  extendedSection?: string; // id секции, в которой создаётся тред
};

const gameAreaText = text.forum.categories.game;
const generalAreaText = text.forum.categories.general;

function Forum({ section, thread, extendedSection }: ForumProps): JSX.Element {
  let forumBody = (
    <>
      <div className={b('category')}>
        <h3 className={b('heading').mix('heading_3', 'heading')}>{gameAreaText.header}</h3>
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  {gameAreaText.sections.gameDiscussion.header}
                </a>
              </h4>
              <p>{gameAreaText.sections.gameDiscussion.description}</p>
            </>
          }
          statSlot={
            <>
              <a className={bLink({ action: true })} href="#">
                Поиграл в игру
              </a>{' '}
              <UserStamp
                profileURL="#"
                user="User"
                date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
              />
            </>
          }
        />
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  {gameAreaText.sections.featureRequests.header}
                </a>
              </h4>
              <p>{gameAreaText.sections.featureRequests.description}</p>
            </>
          }
          statSlot={
            <>
              <a className={bLink({ action: true })} href="#">
                Сделайте новый уровень
              </a>{' '}
              <UserStamp
                profileURL="#"
                user="User"
                date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
              />
            </>
          }
        />
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  {gameAreaText.sections.bugReports.header}
                </a>
              </h4>
              <p>{gameAreaText.sections.bugReports.description}</p>
            </>
          }
          statSlot={
            <>
              <a className={bLink({ action: true })} href="#">
                Девелоперы криворукие
              </a>{' '}
              <UserStamp
                profileURL="#"
                user="User"
                date={new Date('Tue Aug 10 2021 01:40:57 GMT+0400')}
              />
            </>
          }
        />
      </div>
      <div className={b('category')}>
        <h3 className={b('heading').mix('heading_3', 'heading')}>{generalAreaText.header}</h3>
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  {generalAreaText.sections.gameIndustryNews.header}
                </a>
              </h4>
              <p>{generalAreaText.sections.gameIndustryNews.description}</p>
            </>
          }
          statSlot={
            <>
              <a className={bLink({ action: true })} href="#">
                Вышла Half-Life 3
              </a>{' '}
              <UserStamp
                profileURL="#"
                user="User"
                date={new Date('Tue Aug 16 2021 19:40:57 GMT+0400')}
              />
            </>
          }
        />
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  {generalAreaText.sections.generalConversation.header}
                </a>
              </h4>
              <p>{generalAreaText.sections.generalConversation.description}</p>
            </>
          }
          statSlot={
            <>
              <a className={bLink({ action: true })} href="#">
                Сходка
              </a>{' '}
              <UserStamp
                profileURL="#"
                user="User"
                date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
              />
            </>
          }
        />
      </div>
    </>
  );

  if (section) {
    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <ButtonLink
            title={text.forum.createNewThreadButtonTitle}
            className={b('heading-action')}
            sizing="sm"
            theme="circle"
          >
            <Icon name={addNewThreadSvg.id} />
          </ButtonLink>
          {gameAreaText.sections.gameDiscussion.header}
        </h4>
        <div className={b('toolbar')}>
          <div className={b('toolbar-slot', { pagination: true })}>
            <Pagination total={10} current={1} baseURL="/threads" className={b('pagination')} />
          </div>
        </div>
        <div className={b('page')}>
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 12 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы темы темы темы темы темы темы темы темы темы темы темы темы темы
                    темы темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 12 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы темы темы темы темы темы темы темы темы темы темы темы темы темы
                    темы темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 12 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы темы темы темы темы темы темы темы темы темы темы темы темы темы
                    темы темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 12 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы темы темы темы темы темы темы темы темы темы темы темы темы темы
                    темы темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 12 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
          <ForumItemPreview
            className={b('section')}
            descSlot={
              <>
                <h4 className={b('item-heading').mix('heading_4 heading gap-y-xs')}>
                  <a className={bLink()} href="#">
                    Название темы темы темы темы темы темы темы темы темы темы темы темы темы темы
                    темы темы
                  </a>{' '}
                  <span className={b('item-heading-misc')}>
                    (<Icon align="middle" name={viewCountSvg.id} /> 2334 /{' '}
                    <Icon align="middle" name={commentCountSvg.id} /> 1)
                  </span>
                </h4>
                <UserStamp
                  profileURL="#"
                  user="User"
                  date={new Date('Tue Aug 17 2020 01:40:57 GMT+0400')}
                />
              </>
            }
            statSlot={
              <>
                <a className={bLink({ action: true })} href="#">
                  Отрывок текста текста...
                </a>
                <UserStamp
                  profileURL="#"
                  user="NewUser"
                  date={new Date('Tue Aug 17 2021 01:40:57 GMT+0400')}
                />
              </>
            }
          />
        </div>
        <div className={b('toolbar')}>
          <div className={b('toolbar-slot', { pagination: true })}>
            <Pagination total={10} current={1} baseURL="/threads" className={b('pagination')} />
          </div>
        </div>
      </>
    );
  }

  const submitNewMessage = useCallback((values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 400);
  }, []);

  if (thread) {
    const mockComment = {
      user: { id: 1, displayName: 'Ник', avatar: 'url' },
      date: 'Tue Aug 17 2020 01:40:57 GMT+0400',
      content:
        '\n' +
        '            Текст комментария комментария комментария комментария комментария комментария\n' +
        '            комментария комментария комментария комментария комментария комментария комментария\n' +
        '            комментария комментария комментария',
    };

    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <Button
            className={b('heading-action', { shifted: true })}
            display="inline"
            title={text.forum.backToSectionButtonTitle}
            sizing="md"
            theme="subtle"
            icon={<Icon scale={1.4} name={backSvg.id} />}
          />{' '}
          Название темы
        </h4>
        <div className={b('toolbar')}>
          <div className={b('toolbar-slot', { pagination: true })}>
            <Pagination total={10} current={1} baseURL="/threads" className={b('pagination')} />
          </div>
        </div>
        <div className={b('page')}>
          <ForumComment className={b('comment')} data={mockComment} />
          <ForumComment className={b('comment')} data={mockComment} />
          <ForumComment className={b('comment')} data={mockComment} />
        </div>
        <div className={b('toolbar')}>
          <div className={b('toolbar-slot', { pagination: true })}>
            <Pagination total={10} current={1} baseURL="/threads" className={b('pagination')} />
          </div>
        </div>
        <Formik
          initialValues={replyInitialValues}
          validationSchema={replySchema}
          onSubmit={submitNewMessage}
        >
          {({ isSubmitting }) => (
            <Form noValidate className={b('reply')}>
              <Textarea
                required
                className="gap-y-lg"
                theme="solid"
                name="replyMessage"
                hint={text.forum.newMessageAreaPlaceholder}
                rows={10}
              />
              <Button type="submit" disabled={isSubmitting}>
                {text.forum.newMessageButton}
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  const submitNewThread = useCallback((values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 400);
  }, []);

  if (extendedSection) {
    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <Button
            className={b('heading-action', { shifted: true })}
            display="inline"
            title={text.forum.backToSectionButtonTitle}
            sizing="md"
            theme="subtle"
            icon={<Icon scale={1.4} name={backSvg.id} />}
          />{' '}
          Название секции
        </h4>

        <h5 className="gap-y-gen heading_5 heading">{text.forum.newThreadHeader}</h5>
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
                name="topic"
                hint={text.forum.newThreadNameInputPlaceholder}
                isFloating={false}
              />
              <Textarea
                required
                className="gap-y-lg"
                theme="solid"
                name="message"
                hint={text.forum.newThreadMessageAreaPlaceholder}
                rows={10}
              />
              <Button type="submit" disabled={isSubmitting}>
                {text.forum.newThreadButton}
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
          <a className={bLink({ 'text-like': true })} href="#">
            Game
          </a>
        </h1>
      </header>
      <main className={b('body')}>{forumBody}</main>
      <footer className={b('footer')}>
        <div className={b('footer-stat', { registered: true })}>
          {text.forum.stats.registered} 2 {text.forum.stats.registeredUserLabel}
        </div>
        <div className={b('footer-stat', { online: true })}>
          {text.forum.stats.online}{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
          ,{' '}
          <a className={bLink()} href="#">
            User
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Forum;

import React from 'react';
import { block } from 'bem-cn';

import { Button, ButtonLink, Icon, Input, Pagination, Textarea } from '@/components/ui';
import ForumComment from '@/modules/Forum/components/ForumComment';
import ForumItemPreview from '@/modules/Forum/components/ForumItemPreview';
import UserStamp from '@/modules/Forum/components/UserStamp';

import backSvg from 'bootstrap-icons/icons/caret-left.svg';
import commentCountSvg from 'bootstrap-icons/icons/chat-square.svg';
import viewCountSvg from 'bootstrap-icons/icons/eye.svg';
import addNewThreadSvg from 'bootstrap-icons/icons/plus-lg.svg';

const b = block('forum');
const bLink = block('link');

type ForumProps = {
  section?: string; // id выбранной секции
  thread?: string; // id выбранного треда
  extendedSection?: string; // id секции, в которой создаётся тред
};

function Forum({ section, thread, extendedSection }: ForumProps): JSX.Element {
  let forumBody = (
    <>
      <div className={b('category')}>
        <h3 className={b('heading').mix('heading_3', 'heading')}>Об игре</h3>
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  Обсуждение игры
                </a>
              </h4>
              <p>Ваши впечатления и вопросы по игре</p>
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
                  Запрос новых фич
                </a>
              </h4>
              <p>Предложения по новым функциями и улучшениям</p>
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
                  Баг-репорты
                </a>
              </h4>
              <p>Если вы нашли ошибку, сообщите о ней тут</p>
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
        <h3 className={b('heading').mix('heading_3', 'heading')}>Общий раздел</h3>
        <ForumItemPreview
          className={b('section')}
          descSlot={
            <>
              <h4 className={b('item-heading').mix('heading_4', 'heading')}>
                <a className={bLink()} href="#">
                  Новости игровой индустрии
                </a>
              </h4>
              <p>Следите за новостями</p>
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
                  Общение
                </a>
              </h4>
              <p>Здесь вы можете общаться на любые темы</p>
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
            title="Создать новую тему"
            className={b('heading-action')}
            sizing="sm"
            theme="circle"
          >
            <Icon name={addNewThreadSvg.id} />
          </ButtonLink>
          Обсуждение игры
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
            title="В категорию"
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
        <form action="#" className={b('reply')}>
          <Textarea
            required
            className="gap-y-gen"
            theme="solid"
            hint="Введите сообщение (можно использовать markdown)"
            rows={10}
          />
          <Button type="submit">Отправить</Button>
        </form>
      </>
    );
  }

  if (extendedSection) {
    forumBody = (
      <>
        <h4 className={b('heading').mix('heading_4', 'heading')}>
          <Button
            className={b('heading-action', { shifted: true })}
            display="inline"
            title="В секцию"
            sizing="md"
            theme="subtle"
            icon={<Icon scale={1.4} name={backSvg.id} />}
          />{' '}
          Название секции
        </h4>

        <h5 className="gap-y-gen heading_5 heading">Создайте тему</h5>

        <form action="#" className={b('create-thread')}>
          <Input
            required
            className="gap-y-gen"
            theme="solid"
            hint="Название темы"
            isFloating={false}
          />
          <Textarea
            required
            className="gap-y-gen"
            theme="solid"
            hint="Введите сообщение (можно использовать markdown)"
            rows={10}
          />
          <Button type="submit">Создать</Button>
        </form>
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
          Зарегистрировано: 2 пользователя
        </div>
        <div className={b('footer-stat', { online: true })}>
          Сейчас онлайн:{' '}
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

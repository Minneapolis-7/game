import React from 'react';
import { block } from 'bem-cn';
import { formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const b = block('user-stamp');

type UserStampProps = {
  user: string;
  date: Date;
  profileURL?: string;
};

function UserStamp({ user, date, profileURL }: UserStampProps): JSX.Element {
  return (
    <span className={b()}>
      от{' '}
      <a className="link link_action" href={profileURL}>
        {user}
      </a>{' '}
      {`${formatDistance(date, Date.now(), {
        locale: ruLocale,
      })} назад`}
    </span>
  );
}

export default UserStamp;

import React, { useMemo } from 'react';
import { block } from 'bem-cn';
import { formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import text from '@/shared/const/text';

const b = block('user-stamp');
const bLink = block('link');
const { userStamp: txt, timeDistanceLabel } = text;

type UserStampProps = {
  user: string;
  date: Date;
  profileURL?: string;
};

function UserStamp({ user, date, profileURL }: UserStampProps): JSX.Element {
  const dateDistanceText = useMemo(
    () =>
      `${formatDistance(date, Date.now(), {
        locale: ruLocale,
      })} ${timeDistanceLabel}`,
    [date]
  );

  return (
    <span className={b()}>
      {txt.fromLabel}{' '}
      <a className={bLink({ action: true })} href={profileURL}>
        {user}
      </a>{' '}
      {dateDistanceText}
    </span>
  );
}

export default UserStamp;

import React, { PropsWithChildren } from 'react';
import { block } from 'bem-cn';

const b = block('auth');

type AuthProps = PropsWithChildren<{
  heading: string;
  stage: 'login' | 'register';
}>;

function Auth({ heading, stage, children }: AuthProps): JSX.Element {
  return (
    <div className={b()}>
      <h4 className="heading_4 heading">{heading}</h4>
      <form action="#" data-action={stage} className={b('form')}>
        {children}
      </form>
    </div>
  );
}

export default Auth;

import React, { HTMLAttributes, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import { Button, Icon } from '@/components/ui';

import { ToastItem } from './types';

import closeSvg from 'bootstrap-icons/icons/x-lg.svg';

type ToastProps = {
  toast: ToastItem;
  deleteToast: (id: string) => void;
  defaultTimeout: number;
} & HTMLAttributes<HTMLDivElement>;

const b = block('toast');

function Toast(props: ToastProps): JSX.Element {
  const { toast, deleteToast, defaultTimeout } = props;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [startTimer, setStartTimer] = useState(0);
  const [leftTimerTime, setLeftTimerTime] = useState(0);
  const timeout = toast.timeout || defaultTimeout;

  useEffect(() => {
    setStartTimer(performance.now());

    const timeoutId = setTimeout(() => {
      deleteToast(toast.id);
    }, timeout);

    setTimer(timeoutId);

    return () => {
      clearTimeout(timer as ReturnType<typeof setTimeout>);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.timeout]);

  function onMouseEnter() {
    setLeftTimerTime(timeout - (performance.now() - startTimer));
    clearTimeout(timer as ReturnType<typeof setTimeout>);
  }

  function onMouseLeave() {
    const timeoutId = setTimeout(() => {
      deleteToast(toast.id);
    }, leftTimerTime);

    setTimer(timeoutId);
  }

  return (
    <div key={toast.id} className={b()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={b('image', { type: `${toast.type}` })}></div>
      <p className={b('message')}>{toast.description}</p>
      <Button
        className={b('opener')}
        sizing="xs"
        display="inline"
        icon={<Icon name={closeSvg.id} scale={1.5} />}
        onClick={() => deleteToast(toast.id)}
      />
    </div>
  );
}

export default Toast;

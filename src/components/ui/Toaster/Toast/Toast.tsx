import React, { HTMLAttributes, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import { Button, Icon } from '@/components/ui';

import { ToastItem } from './types';

import closeSvg from 'bootstrap-icons/icons/x-lg.svg';

type ToastProps = {
  toast: ToastItem;
  deleteToast: (id: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const b = block('toast');

function Toast(props: ToastProps): JSX.Element {
  const { toast, deleteToast } = props;
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [startTimer, setStartTimer] = useState(0);
  const [leftTimerTime, setLeftTimerTime] = useState(0);

  useEffect(() => {
    setStartTimer(performance.now());
    const timeout = setTimeout(() => {
      if (toast.timeout) {
        deleteToast(toast.id);
      }
    }, toast.timeout || 1);

    setTimer(timeout);

    return () => {
      clearTimeout(timer as NodeJS.Timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.timeout]);

  function onMouseEnter() {
    if (toast.timeout) {
      setLeftTimerTime(5000 - (performance.now() - startTimer));
      clearTimeout(timer as NodeJS.Timeout);
    }
  }

  function onMouseLeave() {
    if (toast.timeout) {
      const timeout = setTimeout(() => {
        deleteToast(toast.id);
      }, leftTimerTime);

      setTimer(timeout);
    }
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

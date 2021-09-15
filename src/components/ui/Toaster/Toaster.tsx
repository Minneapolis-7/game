import React, { HTMLAttributes, useContext, useEffect } from 'react';
import { block } from 'bem-cn';

import AppContext from '@/AppContext';

import { Position, ToastItem } from './Toast/types';
import Toast from './Toast';

type ToastProps = {
  toastList: Array<ToastItem>;
  position: Position;
  timeout: number | null;
} & HTMLAttributes<HTMLDivElement>;

const b = block('toaster');

function Toaster(props: ToastProps): JSX.Element {
  const { toastList, position, timeout } = props;
  const appContext = useContext(AppContext);

  const deleteToast = (id: number) => {
    appContext?.removeToastMessage(id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeout && toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, timeout || 1);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastList, timeout]);

  return (
    <div className={b({ position: `${position}` })}>
      {toastList.map((toast) => (
        <Toast key={toast.id} deleteToast={deleteToast} toast={toast}></Toast>
      ))}
    </div>
  );
}

export default Toaster;

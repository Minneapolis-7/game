import React, { HTMLAttributes, useCallback, useContext } from 'react';
import { block } from 'bem-cn';

import AppContext from '@/AppContext';

import { Position, ToastItem } from './Toast/types';
import Toast from './Toast';

type ToastProps = {
  toastList: Array<ToastItem>;
  position: Position;
  timeout?: number;
} & HTMLAttributes<HTMLDivElement>;

const b = block('toaster');

function Toaster(props: ToastProps): JSX.Element {
  const { toastList, position, timeout } = props;
  const appContext = useContext(AppContext);
  const defaultTimeout = timeout || 5000;

  const deleteToast = useCallback((id: string) => {
    appContext?.removeToastMessage(id);
  }, []);

  return (
    <div className={b({ position: `${position}` })}>
      {toastList.map((toast) => (
        <Toast
          key={toast.id}
          deleteToast={deleteToast}
          toast={toast}
          defaultTimeout={defaultTimeout}
        />
      ))}
    </div>
  );
}

export default Toaster;

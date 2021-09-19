import React, { HTMLAttributes, useCallback, useContext } from 'react';
import { block } from 'bem-cn';

import AppContext from '@/AppContext';

import { Position, ToastItem } from './Toast/types';
import Toast from './Toast';

type ToastProps = {
  toastList: Array<ToastItem>;
  position: Position;
} & HTMLAttributes<HTMLDivElement>;

const b = block('toaster');

function Toaster(props: ToastProps): JSX.Element {
  const { toastList, position } = props;
  const appContext = useContext(AppContext);

  const deleteToast = useCallback((id: string) => {
    appContext?.removeToastMessage(id);
  }, []);

  return (
    <div className={b({ position: `${position}` })}>
      {toastList.map((toast) => (
        <Toast key={toast.id} deleteToast={deleteToast} toast={toast} />
      ))}
    </div>
  );
}

export default Toaster;

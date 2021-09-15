import React, { HTMLAttributes } from 'react';
import { block } from 'bem-cn';

import { Button, Icon } from '@/components/ui';

import { ToastItem } from './types';

import closeSvg from 'bootstrap-icons/icons/x-lg.svg';

type ToastProps = {
  toast: ToastItem;
  deleteToast: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const b = block('toast');

function Toast(props: ToastProps): JSX.Element {
  const { toast, deleteToast } = props;

  return (
    <div key={toast.id} className={b()}>
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

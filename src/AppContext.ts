import { createContext } from 'react';

import { ToastItem } from '@/components/ui/Toaster/Toast/types';

type AppCtx = Nullable<{
  addToastMessage: (toast: ToastItem) => void;
  removeToastMessage: (id: number) => void;
}>;

const AppContext = createContext({} as AppCtx);

export default AppContext;

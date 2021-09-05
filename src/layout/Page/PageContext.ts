import React from 'react';

type PageCtx = Nullable<{
  isSidebarOpened: boolean;
  toggleSidebar: (force: boolean) => void;
}>;
const PageContext = React.createContext({
  isSidebarOpened: false,
} as PageCtx);

export default PageContext;

import React, { useCallback, useContext, useRef, useState } from 'react';
import { block } from 'bem-cn';

import { Button, Icon } from '@/components/ui';
import PageContext from '@/layout/Page/PageContext';
import Nav from '@/modules/Nav';
import { SizeLabels } from '@/shared/const/const';
import text from '@/shared/const/text';
import useFocusTrapping from '@/shared/utils/useFocusTrapping';
import useKeydown from '@/shared/utils/useKeydown';
import { saveCurrentTheme, saveTheme } from '@/store/reducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

import menuSvg from 'bootstrap-icons/icons/list.svg';
import closeSvg from 'bootstrap-icons/icons/x-lg.svg';

const SIDEBAR_SHOW_EVENT = 'sidebarshow';
const SIDEBAR_HIDE_EVENT = 'sidebarhide';

const b = block('sidebar');
const { sidebar: txt } = text;

type SidebarProps = {
  className?: string;
  isOpened: boolean;
};

function Sidebar({ className = '', isOpened }: SidebarProps): JSX.Element {
  const pageContext = useContext(PageContext);
  const { id: userId, themeId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [themeName, setThemeName] = useState(themeId === 0 ? 'Красная тема' : 'Желтая тема');
  const openSidebar = useCallback(
    (e) => {
      openerRef.current = e.target;
      pageContext?.toggleSidebar(true);
      sidebarRef.current?.focus();
      sidebarRef.current?.dispatchEvent(new CustomEvent(SIDEBAR_SHOW_EVENT, { bubbles: true }));
    },
    [pageContext]
  );
  const closeSidebar = useCallback(() => {
    openerRef.current?.focus();
    pageContext?.toggleSidebar(false);
    sidebarRef.current?.dispatchEvent(new CustomEvent(SIDEBAR_HIDE_EVENT, { bubbles: true }));
  }, [pageContext]);

  const changeTheme = useCallback(() => {
    const body = document.getElementsByTagName('body')[0];
    let newThemeId;

    if (themeId === 0) {
      setThemeName(txt.yellowTheme);
      newThemeId = 1;
      body.classList.add('new-theme');
    } else {
      setThemeName(txt.redTheme);
      newThemeId = 0;
      body.classList.remove('new-theme');
    }

    dispatch(saveCurrentTheme(newThemeId));

    if (userId) {
      try {
        dispatch(saveTheme({ userId, themeId: newThemeId }));
      } catch (e) {
        throw new Error(e);
      }
    }
  }, [themeId]);

  useKeydown('Escape', closeSidebar);
  useFocusTrapping(SIDEBAR_SHOW_EVENT, SIDEBAR_HIDE_EVENT);

  return (
    <div className={b({}).mix(className.split(' '))}>
      <Button
        className={b('opener')}
        theme="morphed"
        size={SizeLabels.LG}
        icon={<Icon name={menuSvg.id} scale={1.5} />}
        onClick={openSidebar}
      />
      <div ref={sidebarRef} className={b('container').is({ opened: isOpened })} tabIndex={-1}>
        <div className={b('head')}>
          <h4 className="heading_4 heading nomrg">{txt.header}</h4>
          <Button
            className={b('closer')}
            theme="circle"
            title={txt.closeButtonTitle}
            display="inline"
            icon={<Icon name={closeSvg.id} />}
            onClick={closeSidebar}
          />
        </div>
        <div className={b('body').mix('scrollbar')}>
          <Nav />
        </div>
        <Button onClick={changeTheme}>{themeName}</Button>
      </div>
      <div className={b('backdrop')} onMouseDown={closeSidebar}></div>
    </div>
  );
}

export default Sidebar;

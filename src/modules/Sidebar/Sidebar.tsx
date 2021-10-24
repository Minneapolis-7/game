import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { block } from 'bem-cn';

import { Button, Icon } from '@/components/ui';
import PageContext from '@/layout/Page/PageContext';
import Nav from '@/modules/Nav';
import { DEFAULT_THEME_NAME, SizeLabels } from '@/shared/const/const';
import text from '@/shared/const/text';
import getThemeClassname from '@/shared/utils/getThemeClassname';
import usePreviousValue from '@/shared/utils/hooks/usePreviousValue';
import useFocusTrapping from '@/shared/utils/useFocusTrapping';
import useKeydown from '@/shared/utils/useKeydown';
import { applyTheme, saveThemeSelection } from '@/store/reducers/actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

import menuSvg from 'bootstrap-icons/icons/list.svg';
import closeSvg from 'bootstrap-icons/icons/x-lg.svg';
import halloweenSvg from 'static/assets/img/icons/halloween.svg';

const SIDEBAR_SHOW_EVENT = 'sidebarshow';
const SIDEBAR_HIDE_EVENT = 'sidebarhide';

const togglableTheme = {
  NAME: 'halloween',
  ICON_ID: halloweenSvg.id,
} as const;

const b = block('sidebar');
const { sidebar: txt } = text;

type SidebarProps = {
  className?: string;
  isOpened: boolean;
};

function Sidebar({ className = '', isOpened }: SidebarProps): JSX.Element {
  const pageContext = useContext(PageContext);
  const { id: userId, selectedTheme } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

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

  const isThemeToggled = selectedTheme === togglableTheme.NAME;
  const previousTheme = usePreviousValue(selectedTheme);

  const toggleTheme = useCallback(() => {
    const appliedThemeName = !isThemeToggled ? togglableTheme.NAME : DEFAULT_THEME_NAME;

    dispatch(applyTheme(appliedThemeName));

    if (userId) {
      try {
        dispatch(saveThemeSelection({ userId, themeName: appliedThemeName }));
      } catch (err) {
        throw new Error(err);
      }
    }
  }, [isThemeToggled, dispatch, userId]);

  useEffect(() => {
    if (previousTheme) {
      document.body.classList.replace(
        getThemeClassname(previousTheme),
        getThemeClassname(selectedTheme)
      );
    } else {
      document.body.classList.add(getThemeClassname(selectedTheme));
    }
  }, [previousTheme, selectedTheme]);

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
        <div className={b('footer')}>
          <Button
            className={b('theme-toggler')}
            theme="circle"
            size="xl"
            display="inline"
            data-toggled={isThemeToggled || null}
            icon={<Icon name={togglableTheme.ICON_ID} scale={2} />}
            onClick={toggleTheme}
          />
        </div>
      </div>
      <div className={b('backdrop')} onMouseDown={closeSidebar}></div>
    </div>
  );
}

export default Sidebar;

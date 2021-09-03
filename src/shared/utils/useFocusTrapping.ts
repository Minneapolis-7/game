import { useEffect } from 'react';
import focusableSelectors from 'focusable-selectors';

function isVisible(node: HTMLElement): boolean {
  return !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length);
}

function getFocusableChildren(parent: HTMLElement): HTMLElement[] {
  return [].filter.call(
    parent.querySelectorAll(focusableSelectors.join(',')),
    (child: HTMLElement) => isVisible(child)
  );
}

function trapTabKey(container: HTMLElement, keyboardEvent: KeyboardEvent) {
  const focusableChildren = getFocusableChildren(container);
  const focusedItemIndex = focusableChildren.indexOf(document.activeElement as HTMLElement);

  if (keyboardEvent.shiftKey && focusedItemIndex === 0) {
    focusableChildren[focusableChildren.length - 1].focus();
    keyboardEvent.preventDefault();
  } else if (!keyboardEvent.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
    focusableChildren[0].focus();
    keyboardEvent.preventDefault();
  }
}

type KeydownHandler = {
  container: Nullable<HTMLElement>;
  handleEvent: () => void;
};

const handler = {
  container: null,
  handleEvent(e: KeyboardEvent) {
    if (this.container instanceof HTMLElement && e.key === 'Tab') {
      trapTabKey(this.container, e);
    }
  },
} as KeydownHandler;

function onShow(evt: Event) {
  handler.container = evt.target as HTMLElement;
  document.addEventListener('keydown', handler);
}

function onHide() {
  handler.container = null;
  document.removeEventListener('keydown', handler);
}

/**
 * Захват фокуса внутри всплывающего контейнера
 * https://github.com/twbs/bootstrap/issues/28481#issuecomment-763017750
 * @param showEvent - событие показа контейнера
 * @param hideEvent - событие скрытия контейнера
 */
export default function useFocusTrapping(showEvent: string, hideEvent: string): void {
  useEffect(() => {
    document.addEventListener(showEvent, onShow);
    document.addEventListener(hideEvent, onHide);

    return () => {
      document.removeEventListener(showEvent, onShow);
      document.removeEventListener(hideEvent, onHide);
      document.removeEventListener('keydown', handler);
    };
  }, []);
}

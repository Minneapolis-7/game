import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef, useCallback } from 'react';

import { ButtonLink } from '@/components/ui';
import { ButtonLinkProps } from '@/components/ui/Button/ButtonLink';

export default function getRoutedButtonLink(buttonLinkProps: ButtonLinkProps) {
  return forwardRef(function WrappedButtonLink(
    props: { navigate: () => void } & AnchorHTMLAttributes<HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) {
    const { navigate, ...rest } = props;

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        navigate();
      },
      [navigate]
    );

    return <ButtonLink ref={ref} onClick={handleClick} {...buttonLinkProps} {...rest} />;
  });
}

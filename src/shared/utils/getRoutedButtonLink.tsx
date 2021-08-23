import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react';

import { ButtonLink } from '@/components/ui';
import { ButtonLinkProps } from '@/components/ui/Button/ButtonLink';

export default function getRoutedButtonLink(buttonLinkProps: ButtonLinkProps) {
  return forwardRef(function WrappedButtonLink(
    props: { navigate: () => void } & AnchorHTMLAttributes<HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) {
    const { navigate, ...rest } = props;

    function handleClick(e: React.MouseEvent) {
      e.preventDefault();
      navigate();
    }

    return <ButtonLink ref={ref} onClick={handleClick} {...buttonLinkProps} {...rest} />;
  });
}

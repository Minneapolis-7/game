import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import { ButtonLinkProps } from '@/components/ui/Button/ButtonLink';
import { ButtonLink } from '@/components/ui';

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

import { ReactNode } from 'react';

import { FieldBaseProps } from '@/components/ui/types/FieldBaseProps';

export type ButtonBaseProps = FieldBaseProps & {
  icon?: ReactNode;
};

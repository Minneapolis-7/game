import { SizeLabel } from '@/shared/types/SizeLabel';

export type FieldBaseProps = {
  // "тема", определённая в стилях компонента модификатором _theme_X
  theme?: string;
  // размер поля
  size?: SizeLabel;
  // inline — выравнивание компонента по базовой линии в тексте; block — блочное поведение
  display?: 'inline' | 'block';
};

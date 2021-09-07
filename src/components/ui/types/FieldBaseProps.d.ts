type FieldBaseProps = {
  // "тема", определённая в стилях компонента модификатором _theme_X
  theme?: string;
  // размер поля (не "size", потому что у <input> есть HTML-свойство "size")
  sizing?: SizeLabel;
  // inline — выравнивание компонента по базовой линии в тексте; block — блочное поведение
  display?: 'inline' | 'block';
};

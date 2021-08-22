type FieldBaseProps = {
  // "тема", определённая в стилях компонента модификатором _theme_X
  theme?: string;
  // размер поля (не "size", потому что у <input> есть HTML-свойство "size")
  sizing?: 'sm' | 'md' | 'lg' | 'xl' | 'default';
  // inline — выравнивание компонента по базовой линии в тексте; block — блочное поведение
  display?: 'inline' | 'block';
};

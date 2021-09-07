// Не учитывать "физические" значения (cm/in/...)
type CSSLengthString =
  | CSSLengthSimpleString
  | CSSUnitString<'%' | 'lh' | 'vw' | 'vh' | 'vmin' | 'vmax' | 'ex' | 'ch'>;

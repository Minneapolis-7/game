export type InputBaseProps = {
  // обычный `className` назначается обёртке, самому полю — `fieldClassName`
  fieldClassName?: string;
  // текст подсказки, также используется в атрибуте `placeholder`
  hint?: string;
  // при фокусе подсказки уплывают вверх
  isFloating?: boolean;
  // если требуется, то ошибка стилизована внутри полей и может быть передана внутрь
  error?: string;
};

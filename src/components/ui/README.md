# Библиотека компонентов

Библиотека базовых React-компонентов для построения UI.

### Важно
Библиотека строится на базовых стилях, расположенных в `/src/css`. Стили компонентов подключаются через `/src/css/main.scss` из-за проблемы, описанной [в этом комментарии в Discord](https://discord.com/channels/872154164560531497/872154164560531502/874251736389414913). После решения этой проблемы стили будут подключаться как обычно — в самом компоненте.

Некоторые компоненты имеют идентичные стили и почти идентичную разметку и пропсы, но разные теги, и сделаны отдельными компонентами. Непонятно, насколько это оправдано, но в реалиях тайпскрипта по-другому и не получится, т.к. пропсы статично типизируются в зависимости от атрибутов конкретного HTML-тега, например, `<button>` и `<a>`. Такие компоненты располагаются в одной папке, но имеют разные названия, т.к. делят и CSS, и типы. Для примера см. папки `components/ui/Button` или `components/ui/Input`.

Имя CSS-файла компонента начинается с маленькой буквы (в отличии от файла компоннета), т.к. в CSS компонент называется с маленькой буквы и применяется BEM.

### Использование
Компоненты [реэкспортируются](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#re-exporting_aggregating) через единый файл `components/ui/index.ts`. Чтобы использовать компоненты, можно:
- экспортировать их из `components/ui/index.ts`
```
import { Button, Icon, Input } from 'components/ui';
```
*Примечание: в проекте настроен webpack-резолв модулей из папки `src` наравне с папкой `node_modules`. Т.е. можно не использовать относительные пути, и, например, вместо `../components` писать сразу `components`*
- экспортировать одиночно
```
import Button from 'components/ui/Button';
```

### Описание компонент

#### Button
Кнопка через `<button>`. Принимает все атрибуты, которые может принимать тег `<button>`, а также свойства: 
- `theme?: string` - "тема" `X`, описанная в CSS компонента модификатором `_theme_X`
- `sizing?: 'sm' | 'lg' | 'xl' | 'default'` - размер (не "size", потому что у <input> есть HTML-свойство "size", и размер для всех полей нужно задавать единым свойством)
- `display?: 'inline' | 'block'` - режим отображения (`inline` — выравнивание компонента по базовой линии в тексте; `block` — блочное поведение)
- `icon?: ReactNode` - почти что угодно, но лучше использовать отдельный компонент `Icon` 

Текст кнопки передаётся через `children`.

Компонент использует [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) для обеспечения доступа к DOM-элементу компонента.

#### ButtonLink
Кнопка через `<a>`. Принимает все атрибуты, которые может принимать тег `<a>`, а также свойства: 

- `theme?: string` - "тема" `X`, описанная в CSS компонента модификатором `_theme_X`
- `sizing?: 'sm' | 'lg' | 'xl' | 'default'` - размер (не "size", потому что у <input> есть HTML-свойство "size", и размер для всех полей нужно задавать единым свойством)
- `display?: 'inline' | 'block'` - режим отображения (`inline` — выравнивание компонента по базовой линии в тексте; `block` — блочное поведение)
- `icon?: ReactNode` - почти что угодно, но лучше использовать отдельный компонент `Icon` 

Текст кнопки передаётся через `children`.

Компонент использует [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) для обеспечения доступа к DOM-элементу компонента.

#### Icon

Иконка. Работает в связке с [`svg-sprite-loader`](https://github.com/JetBrains/svg-sprite-loader). Принимает все атрибуты, которые может принимать тег `<span>`, а также свойства: 
- `name: string` - id, возвращаемый `svg-sprite-loader`, обычно это имя svg-файла иконки, см. https://github.com/JetBrains/svg-sprite-loader#runtime-configuration
- `size?: string` - CSS-значения, например: `2rem`, `32px` (в рамках того, что можно установить как `width` и `height` для `<svg>`)

#### Input

Инпут. Принимает все атрибуты, которые может принимать тег `<input>`, а также свойства: 
      
- `theme?: string` - "тема" `X`, описанная в CSS компонента модификатором `_theme_X`
- `sizing?: 'sm' | 'lg' | 'xl' | 'default'` - размер (не "size", потому что у <input> есть HTML-свойство "size", и размер для всех полей нужно задавать единым свойством)
- `display?: 'inline' | 'block'` - режим отображения (`inline` — выравнивание компонента по базовой линии в тексте; `block` — блочное поведение)
- `fieldClassName?: string` - обычный `className` назначается обёртке, самому полю — `fieldClassName`
- `hint?: string` - текст подсказки, также используется в атрибуте `placeholder`
- `isFloating?: boolean` - при фокусе подсказки уплывают вверх

Компонент использует [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) для обеспечения доступа к DOM-элементу компонента.

#### Textarea

Текстареа. Принимает все атрибуты, которые может принимать тег `<textarea>`, а также свойства: 
      
- `theme?: string` - "тема" `X`, описанная в CSS компонента модификатором `_theme_X`
- `sizing?: 'sm' | 'lg' | 'xl' | 'default'` - размер (не "size", потому что у <input> есть HTML-свойство "size", и размер для всех полей нужно задавать единым свойством)
- `display?: 'inline' | 'block'` - режим отображения (`inline` — выравнивание компонента по базовой линии в тексте; `block` — блочное поведение)
- `fieldClassName?: string` - обычный `className` назначается обёртке, самому полю — `fieldClassName`
- `hint?: string` - текст подсказки, также используется в атрибуте `placeholder`
- `isFixed?: boolean` -  `<textarea>` не может менять свою высоту

Компонент использует [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) для обеспечения доступа к DOM-элементу компонента.

[Текстовое значение передаётся через `value`.](https://reactjs.org/docs/dom-elements.html#value)
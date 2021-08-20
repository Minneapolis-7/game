# game

Дистрибутив на Heroku: https://minneapolis-game.herokuapp.com

## Установка

Для работы необходим [Node.js >=12.13.0](https://nodejs.org/en/), установленный на вашем компьютере. А также [git](https://git-scm.com/downloads) (не забудьте добавить его в `PATH`).

Скачайте репозиторий и установите зависимости, запустив `npm i` в корне репозитория. Базовые команды: 
- `npm run start` — старт проекта в дев-режиме (локальный сервер и авто-сборка при изменениях в коде),
- `npm run build` — сборка для production,
- `npm run build:analyze` — сборка для production с анализом бандла,
- `npm run build:compress` — сборка для production со сжатием,
- `npm run debug:dev` — запуск дев-сборки в [дебаг-режиме Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/),
- `npm run debug:prod` — запуск production-сборки в [дебаг-режиме Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/),
- `npm run lint` — линтинг кода,

## Инструментарий

Типизация:
- [TypeScript](https://www.typescriptlang.org/)

Процессинг CSS:
- [SASS](https://sass-lang.com/)
- [PostCSS](https://github.com/postcss/postcss)

Линтинг и форматрирование: 
- [ESLint](https://eslint.org/), 
- [stylelint](https://stylelint.io/), 
- [Prettier](https://prettier.io/), 
- [EditorConfig](https://editorconfig.org/)

Сборка:
- [webpack](https://webpack.js.org/)

## Авторы проекта
[@mukhindev](https://github.com/mukhindev), [@DariaZherebtsova](https://github.com/DariaZherebtsova/), [@andreyvolokitin](https://github.com/andreyvolokitin/)

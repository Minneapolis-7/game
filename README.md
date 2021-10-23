# game

Дистрибутив на Heroku: https://minneapolis-game.herokuapp.com

## Установка

Для работы необходим [Node.js >=12.13.0](https://nodejs.org/en/), установленный на вашем компьютере. А также [git](https://git-scm.com/downloads) (не забудьте добавить его в `PATH`).

Скачайте репозиторий и установите зависимости, запустив `npm i` в корне репозитория. Базовые команды:

- `npm run start` — старт проекта в дев-режиме (локальный сервер и авто-сборка при изменениях в коде),
- `npm run db:seed` — загрузить статические данные в БД,
- `npm run build` — сборка для production,
- `npm run build:analyze` — сборка для production с анализом бандла,
- `npm run build:compress` — сборка для production со сжатием,
- `npm run debug:dev` — запуск дев-сборки в [дебаг-режиме Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/),
- `npm run debug:prod` — запуск production-сборки в [дебаг-режиме Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/),
- `npm run lint` — линтинг кода,

## Переменные окружения

Переменные окружения обрабатываются через `.env`-файл, который применяется через [dotenv](https://github.com/motdotla/dotenv#faq), или через средства Docker. Перед запуском проекта вам нужно создать локальный `.env`-файл и заполнить его по своему усмотрению, согласно примеру из `.sample.env`

## Запуск

Убедитесь, что у вас установлены Docker и docker-compose. Для успешного запуска должна существовать база данных, для этого надо сначала поднять окружение (Postgres и [pgAdmin](https://www.pgadmin.org/)):

- `docker-compose up -d`

После этого нужно запустить проект:

- `npm run start`

После успешного запуска, сделайте сид данных в базу. Это надо сделать 1 раз после первого старта:

- `npm run db:seed`

Проект готов к работе

## Инструментарий

Типизация:

- [TypeScript](https://www.typescriptlang.org/)

Процессинг CSS:

- [SASS](https://sass-lang.com/)
- [PostCSS](https://github.com/postcss/postcss)

Линтинг и форматирование:

- [ESLint](https://eslint.org/),
- [stylelint](https://stylelint.io/),
- [Prettier](https://prettier.io/),
- [EditorConfig](https://editorconfig.org/)

Сборка:

- [webpack](https://webpack.js.org/)

## Авторы проекта

[@mukhindev](https://github.com/mukhindev), [@DariaZherebtsova](https://github.com/DariaZherebtsova/), [@andreyvolokitin](https://github.com/andreyvolokitin/)

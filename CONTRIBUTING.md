# Contributing

## Прежде, чем начать

Пожалуйста, если вы работаете над данным проектом,
внимательно прочитайте и следуйте правилам описанным в данном документе.

## Рабочий процесс спринта

1. Составляем backlog, перемещая нужные задачи из [Issues](https://github.com/Minneapolis-7/game/issues) на [доску](https://github.com/orgs/Minneapolis-7/projects/1) в колонку `To do`
2. Обсуждаем, кто какие задачи берёт
3. Забираем себе задачу из `To do`, перемещая из колонки `To do` в `In progress`
4. Подтягиваем текущие изменения в ветке `dev`
5. Создаём из `dev` ветку под задачу с названием по [шаблону](#ветки-под-задачи)
6. Работаем над задачей
7. На выполненную задачу открываем `Pull Request` в ветку `dev`
8. Этап ревью. Задачу перемещаем из `In progress` в `Review in progress`
   1. Выполняем командное ревью (остальные участники команды выполняют ревью кода)
   2. Ожидаем менторское ревью
   3. При доработке временно перемещаем задачу в `In progress`
9. Если задача завершена, выполняем сквош коммитов
10. Закрываем `Pull Request` вливанием в `dev`
11. Выполненную задачу переносим из `Review in progress` в `Done`
12. Возвращаемся к пункту `3` за следующей задачей

## Идеи и проблемы

Идеи и проблемы касательно проекта заносим в [Issues](https://github.com/Minneapolis-7/game/issues)

## Спринт

Спринт длится 2 недели.

В начале спринта необходимо иметь список задач на спринт,
размещённый на [доске](https://github.com/orgs/Minneapolis-7/projects/1) в колонке `To do`,
состоящий из задач [Issues](https://github.com/Minneapolis-7/game/issues).
Список отсортирован в порядке убывания важности (сверху самые важные).

`To do` содержит запланированные на спринт задачи,
которые необходимо закрыть к концу спринта,
закладывая в закрытие время на ревью.

## Ветки

### Основные ветки

`main` — ветка для прод-версии продукта.

`dev` — ветка для разработки. Ветка в которую сливаются все выполненные задачи.

### Ветки под задачи

> Важно! 1 задача — 1 ветка!

Под каждую задачу связанную с кодом, создаём [Issue](https://github.com/Minneapolis-7/game/issues),
чтобы получить уникальный порядковый номер задачи.

Используем порядковый номер задачи для именования веток под задачи.

Шаблон: `task-X`, где `проект` название проекта, а `X` порядковый номер задачи `Issue`.

Примеры:

```bash
game-1
game-2
game-71
game-144
```

## Коммиты

Придерживаемся следующего соглашения о коммитах:

Сообщение коммита должно начинаться с оговоренных типов, например с `feat`, `fix`.

Непосредственно сообщение от типа отделяется знаком `:`, **после двоеточия пробел**.

Примеры:

```bash
git commit -m "task-1: feat: реализовать компонент Input"
git commit -m "task-9: fix: исправить отступы в мобильной версии"
```

Тип коммита и сообщение коммита начинаются с маленькой буквы.
Сообщение коммита пишется на русском языке и должно отвечать на вопрос — `Что сделать?`.

```text
Что сделать? Добавить
Что сделать? Реализовать
Что сделать? Исправить
```

### Типы коммитов

`feat` — должен использоваться, когда коммит добавляет новый функционал в ваше приложение.

`fix` — должен использоваться, когда коммит исправляет баг в вашем приложении.

`docs` — работа над документацией и файлами с описанием проекта и процессов (README.md, CONTRIBUTING.md).

## Code style

Договорённости по написанию кода.

### Конфиги ESLint и Stylelint

- JS/TS (детально см. `.eslintrc.js`): https://github.com/airbnb/javascript, [@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs#recommended), [react/recommended](https://github.com/yannickcr/eslint-plugin-react), [react-hooks/recommended](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- CSS (детально см. `.stylelintrc.json`): [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard), [stylelint-config-hudochenkov/order](https://github.com/hudochenkov/stylelint-order/tree/master/rules/order)

### Другие инструменты

Также в проекте используются:

- [Prettier](https://prettier.io/), необходимо [интегрировать его в свой редактор](https://prettier.io/docs/en/editors.html),
- [EditorConfig](https://editorconfig.org/)

### Другие правила

Для SCSS:

- не использовать в коде [parent selector (&)](https://sass-lang.com/documentation/style-rules/parent-selector)

Для npm-скриптов

- если со скриптом возникают проблемы из-за отсуствия кавычек у некоторых выражений внутри скрипта (обычно это бывает на Windows), то нужно применять только двойные кавычки

## Доставка

### Docker

Состав docker-образа:

- Alpine Linux
- Node 14
- `./dist/static` — дистрибутив web-приложения
- `./dist/server.js` — дистрибутив сервера

### Доставка на Heroku

#### Установка Heroku

https://devcenter.heroku.com/articles/heroku-cli

#### Реестр контейнеров

Если вы этого ещё не делали, зарегистрируйтесь/войдите:

```bash
heroku login
```

Вход в реестр контейнеров:

```bash
heroku container:login
```

#### Отправка

Команды выполнять в корневой директории проекта

Создание docker-образа по `Dockerfile` и отправка в реестр:

```bash
heroku container:push web
```

Выпустить релиз:

```bash
heroku container:release web
```

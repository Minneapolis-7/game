# Контроль утечек памяти

## Игра

В предыдущей версии архитектуры игры экземпляр `Game`
создавался при каждом монтировании компонента `GameReactComponent` в `React`,
а это перезапуск игры после поражения/победы и уход/возвращение на главную страницу.

Новый подход создаёт экземпляр `Game` единожды.

При первом монтировании `GameReactComponent` происходит инициализация ресурсов
(загрузка спрайтов, звуков и т.д.). Запуск игры.

При размонтировании `GameReactComponent` игра ставится на "паузу".
Останавливается анимация, музыка, удаляются слушатели управление.

При повторном монтировании `GameReactComponent`. Используются полученные при
инициализации ресурсы, восстанавливается управление, сбрасываются игровые объекты,
положение игрока, перерисовывается уровень, запускаются музыка и анимация.
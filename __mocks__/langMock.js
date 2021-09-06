export default {
  nav: {
    main: 'Главная',
    login: 'Вход',
    register: 'Регистрация',
    profile: 'Профиль',
    leaderboard: 'Лидеры',
    forum: 'Форум',
    forumSection: 'Форум секция',
    forumThread: 'Форум тема',
    forumThreadCreate: 'Форум создать тему',
  },
  sidebar: {
    header: 'Выберите раздел',
    closeButtonTitle: 'Закрыть',
  },
  login: {
    header: 'Вход',
    submitButton: 'Войти',
    loginLabel: 'Логин',
    passwordLabel: 'Пароль',
    registerLink: 'Зарегистрироваться',
  },
  register: {
    header: 'Регистрация',
    submitButton: 'Зарегистрироваться',
    emailLabel: 'E-mail',
    loginLabel: 'Логин',
    firstNameLabel: 'Имя',
    secondNameLabel: 'Фамилия',
    passwordLabel: 'Пароль',
    passwordRepeatLabel: 'Повторите пароль',
    loginLink: 'Войти',
  },
  profile: {
    emailLabel: 'Почта',
    loginLabel: 'Логин',
    firstNameLabel: 'Имя',
    secondNameLabel: 'Фамилия',
    nickNameLabel: 'Ник в игре',
    oldPasswordLabel: 'Старый пароль',
    newPasswordLabel: 'Новый пароль',
    editButton: 'Изменить данные',
    editPasswordButton: 'Изменить пароль',
    logoutButton: 'Выйти',
    saveButton: 'Сохранить',
    editPlaceholder: 'Редактировать',
    editAvatarTitle: 'Выбрать аватар',
  },
  forum: {
    categories: {
      game: {
        header: 'Об игре',
        sections: {
          gameDiscussion: {
            header: 'Обсуждение игры',
            description: 'Ваши впечатления и вопросы по игре',
          },
          featureRequests: {
            header: 'Запрос новых фич',
            description: 'Предложения по новым функциями и улучшениям',
          },
          bugReports: {
            header: 'Баг-репорты',
            description: 'Если вы нашли ошибку, сообщите о ней тут',
          },
        },
      },
      general: {
        header: 'Общий раздел',
        sections: {
          gameIndustryNews: {
            header: 'Новости игровой индустрии',
            description: 'Следите за новостями',
          },
          generalConversation: {
            header: 'Общение',
            description: 'Здесь вы можете общаться на любые темы',
          },
        },
      },
    },
    stats: {
      registered: 'Зарегистрировано:',
      registeredUserLabel: 'пользователей',
      online: 'Сейчас онлайн:',
    },
    createNewThreadButtonTitle: 'Создать новую тему',
    backToSectionButtonTitle: 'Назад в секцию',
    newMessageAreaPlaceholder: 'Введите сообщение (можно использовать markdown)',
    newMessageButton: 'Отправить',
    commentReplyButton: 'Ответить',
    commentEditButtonTitle: 'Редактировать',
    commentDeleteButtonTitle: 'Удалить',
    newThreadHeader: 'Создайте тему',
    newThreadNameInputPlaceholder: 'Название темы',
    newThreadMessageAreaPlaceholder: 'Введите сообщение (можно использовать markdown)',
    newThreadButton: 'Создать',
  },
  leaderboard: {
    header: 'Рейтинг игроков',
  },
  game: {
    playButton: 'Играть',
    playMoreButton: 'Могу лучше!',
    retryButton: 'Ещё раз!',
    lossText: 'Потрачено',
    winText: 'Победа!',
  },
  pagination: {
    prevPageButtonTitle: 'Предыдущая страница',
    nextPageButtonTitle: 'Следующая страница',
  },
  userStamp: {
    fromLabel: 'от',
  },
  validation: {
    errors: {
      required: 'Заполните поле',
      email: 'Укажите email',
      passwordRepeat: 'Повторите пароль',
      min: 'Введите более',
      max: 'Введите не более',
      minMaxLabel: 'символов',
    },
  },
};

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TestComponent from './testRequest';

const container = document.createElement('div');

beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
  }

  // container = null;
});

it('renders user data', async () => {
  const fakeUser = {
    name: 'Joni Baez',
    age: '32',
    address: '123, Charming Avenue',
  };

  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  // Используем act асинхронно, чтобы передать успешно завершённые промисы
  await act(async () => {
    render(<TestComponent title="Тест" />, container);
  });

  expect(container.querySelector('summary').textContent).toBe(fakeUser.name);
  expect(container.querySelector('strong').textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // выключаем фиктивный fetch, чтобы убедиться, что тесты полностью изолированы
  global.fetch.mockRestore();
});

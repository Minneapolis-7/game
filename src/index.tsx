import React from 'react';
import ReactDOM from 'react-dom';

import icon from 'bootstrap-icons/icons/moon.svg';

import './css/main.scss';

import { Button, ButtonLink, Icon, Input, Textarea } from 'components';

ReactDOM.render(
  <>
    <Button icon={<Icon name={icon.id} />} theme="2" />
    <Button sizing="lg" icon={<Icon name={icon.id} />} theme="2">
      Кнопка
    </Button>
    <ButtonLink sizing="sm" href="//google.com" theme="0">
      Ссылка
    </ButtonLink>
    <ButtonLink href="//google.com">Ссылка</ButtonLink>
    <Icon size="2rem" name={icon.id} />
    <Input className="gap-y-lg" hint="Инпут" />
    <Textarea display="inline" cols={50} rows={10} hint="Test" />
  </>,
  document.getElementById('root')
);

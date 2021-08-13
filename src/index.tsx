import React from 'react';
import ReactDOM from 'react-dom';

import './css/main.scss';

// import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

// import icon from 'bootstrap-icons/icons/moon.svg';
// import { Button, ButtonLink, Icon, Input, Textarea } from 'components';
// <Page>
//   <Button icon={<Icon name={icon.id} />} theme="2" />
//   <Button sizing="lg" icon={<Icon name={icon.id} />} theme="2">
//     Кнопка
//   </Button>
//   <ButtonLink sizing="sm" href="//google.com" theme="0">
//     Ссылка
//   </ButtonLink>
//   <ButtonLink href="//google.com">Ссылка</ButtonLink>
//   <Icon size="2rem" name={icon.id} />
//   <Input sizing="xl" className="gap-y-lg" theme="solid" hint="Инпут" />
//   <Input sizing="lg" className="gap-y-lg" hint="Инпут" />
//   <Input className="gap-y-lg" hint="Инпут" />
//   <Input sizing="sm" className="gap-y-lg" hint="Инпут" />
//   <Textarea display="inline" cols={50} rows={10} hint="Test" />
// </Page>
ReactDOM.render(<RegisterPage />, document.getElementById('root'));

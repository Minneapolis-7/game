import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input } from '@/components/formik-ui';
import { Avatar, Button, Filepick } from '@/components/ui';
import paths from '@/shared/const/paths';
import getResourceURL from '@/shared/utils/getResourceURL';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';

import { PasswordFieldsSchema, ProfileFieldsSchema } from './schema';

const b = block('profile');

const PasswordFieldsInitialValues = {
  oldPassword: '',
  newPassword: '',
};

type ProfileTableRowProps = {
  label: string;
  value?: string;
  id: string;
  inputType?: string;
  required?: boolean;
  action?: string;
  autoComplete?: string;
};

function ProfileTableRow({
  label,
  value,
  id,
  action,
  inputType = 'text',
  required = true,
  autoComplete,
}: ProfileTableRowProps): JSX.Element {
  const BaseInput = (
    <Input
      className={b('input')}
      name={id}
      id={id}
      display="inline"
      theme="transparent"
      hint="Редактировать"
      type={inputType}
      required={required}
      autoComplete={autoComplete}
      onFocus={(e) => e.target.select()}
    />
  );
  // ZERO-WIDTH-SPACE (\u200B) — на случай, если `value` пуст, нужно для выравнвиания текста
  let rowCellContent = <span className={b('field')}>{value || '\u200B'}</span>;

  if (action === 'edit') {
    rowCellContent = BaseInput;
  }

  if (action === 'edit-password') {
    rowCellContent = React.cloneElement(BaseInput, { type: 'password' });
  }

  return (
    <tr className={b('table-row')}>
      <th className={b('table-cell')}>
        {!action ? (
          <span className={b('field')}>{label}</span>
        ) : (
          <label htmlFor={id} className={b('field')}>
            {label}
          </label>
        )}
      </th>
      <td className={b('table-cell')}>{rowCellContent}</td>
    </tr>
  );
}

type ProfileProps = {
  user: Record<string, any>; // todo: указать тип
  action?: 'edit' | 'edit-password';
};

function Profile({ user, action }: ProfileProps): JSX.Element {
  const handleAvatarChange = useCallback((e) => {
    alert(`Загрузить ${e.target.files[0].name}`);
  }, []);
  let initialValues = {};
  let validationSchema = {};

  if (action === 'edit') {
    initialValues = user;
    validationSchema = ProfileFieldsSchema;
  }

  if (action === 'edit-password') {
    initialValues = PasswordFieldsInitialValues;
    validationSchema = PasswordFieldsSchema;
  }

  return (
    <div className={b()}>
      <header className={b('head')}>
        <Avatar className={b('pic')} size="10rem" src={getResourceURL(user.avatar)} populatable>
          <Filepick
            className={b('pic-setter')}
            id="avatar"
            name="avatar"
            accept="image/jpeg, image/png, image/gif, image/tiff, .jpg, .jpeg, .png, .gif, .tif, .tiff"
            onChange={handleAvatarChange}
          />
        </Avatar>
      </header>
      <div className={b('content')}>
        <h4 className={b('name').mix('heading_4', 'heading')}>{user.firstName}</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form data-action={action} className="js-profile__form" noValidate>
              <table className={b('table')}>
                <tbody className={b('table-body')}>
                  {(action === 'edit' || !action) && (
                    <>
                      <ProfileTableRow
                        label="Почта"
                        value={user.email}
                        id="email"
                        inputType="email"
                        action={action}
                      />
                      <ProfileTableRow
                        label="Логин"
                        value={user.login}
                        id="login"
                        action={action}
                      />
                      <ProfileTableRow
                        label="Имя"
                        value={user.firstName}
                        id="firstName"
                        action={action}
                      />
                      <ProfileTableRow
                        label="Фамилия"
                        value={user.secondName}
                        id="secondName"
                        action={action}
                      />
                      <ProfileTableRow
                        label="Ник в игре"
                        value={user.displayName}
                        id="displayName"
                        action={action}
                      />
                    </>
                  )}
                  {action === 'edit-password' && (
                    <>
                      <ProfileTableRow
                        label="Старый пароль"
                        value={user.password}
                        id="oldPassword"
                        inputType="password"
                        autoComplete="current-password"
                        action={action}
                      />
                      <ProfileTableRow
                        label="Новый пароль"
                        id="newPassword"
                        inputType="password"
                        autoComplete="new-password"
                        action={action}
                      />
                    </>
                  )}
                </tbody>
                <tfoot className={b('table-tfoot')}>
                  {!action && (
                    <>
                      <tr className={b('table-row')}>
                        <td colSpan={2} className={b('table-cell')}>
                          <Link
                            to={paths.PROFILE_EDIT}
                            component={getRoutedButtonLink({
                              theme: 'link',
                              children: 'Изменить данные',
                            })}
                          />
                        </td>
                      </tr>
                      <tr className={b('table-row')}>
                        <td colSpan={2} className={b('table-cell')}>
                          <Link
                            to={paths.PROFILE_EDIT_PASSWORD}
                            component={getRoutedButtonLink({
                              theme: 'link',
                              children: 'Изменить пароль',
                            })}
                          />
                        </td>
                      </tr>
                      <tr className={b('table-row')}>
                        <td colSpan={2} className={b('table-cell')}>
                          <Button className="js-profile__logout" theme="link-danger">
                            Выйти
                          </Button>
                        </td>
                      </tr>
                    </>
                  )}
                  {action && (
                    <tr className={b('table-row')}>
                      <td colSpan={2} className={b('table-cell')}>
                        <Button type="submit" disabled={isSubmitting}>
                          Сохранить
                        </Button>
                      </td>
                    </tr>
                  )}
                </tfoot>
              </table>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;

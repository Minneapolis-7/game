import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import AppContext from '@/AppContext';
import { Input } from '@/components/formik-ui';
import { Avatar, Button, Filepick } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import translateErrorMessage from '@/shared/utils';
import getResourceURL from '@/shared/utils/getResourceURL';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import { logout, updateAvatar, updatePassword, updateProfile } from '@/store/reducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { PasswordFieldsSchema, ProfileFieldsSchema } from './schema';
import { actionType } from './types';

const b = block('profile');
const { profile: txt } = text;

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

function ProfileTableRow(props: ProfileTableRowProps): JSX.Element {
  const { label, value, id, action, inputType = 'text', required = true, autoComplete } = props;
  const handleInputFocus = useCallback((e) => e.target.select(), []);

  const BaseInput = (
    <Input
      className={b('input')}
      name={id}
      id={id}
      display="inline"
      theme="transparent"
      hint={txt.editPlaceholder}
      type={inputType}
      required={required}
      autoComplete={autoComplete}
      onFocus={handleInputFocus}
    />
  );
  // ZERO-WIDTH-SPACE (\u200B) — на случай, если `value` пуст, нужно для выравнвиания текста
  let rowCellContent = <span className={b('field')}>{value || '\u200B'}</span>;

  if (action === actionType.edit) {
    rowCellContent = BaseInput;
  }

  if (action === actionType.editPassword) {
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
  const appContext = useContext(AppContext);
  const dispatch = useAppDispatch();

  const handleAvatarChange = useCallback(async (e) => {
    const formData = new FormData();

    formData.append('avatar', e.target.files[0]);

    try {
      await dispatch(updateAvatar(formData)).unwrap();

      const toast = {
        type: 'success',
        description: text.updateAvatarSuccess,
      };

      appContext?.addToastMessage(toast as ToastItem);
    } catch (err) {
      const toast = {
        type: 'warning',
        description: translateErrorMessage(err.reason),
      };

      appContext?.addToastMessage(toast as ToastItem);
    }
  }, []);

  const doLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (e) {
      throw new Error(e);
    }
  }, []);
  const isLoggingOut = useAppSelector((state) => state.user.isLoggingOut);

  let initialValues = {};
  let validationSchema = {};

  if (action === actionType.edit) {
    initialValues = user;
    validationSchema = ProfileFieldsSchema;
  }

  if (action === actionType.editPassword) {
    initialValues = PasswordFieldsInitialValues;
    validationSchema = PasswordFieldsSchema;
  }

  const submitProfile = useCallback(async (values, actions) => {
    try {
      if (action === actionType.edit) {
        await dispatch(updateProfile(values)).unwrap();

        const toast = {
          type: 'success',
          description: text.updateProfileSuccess,
        };

        appContext?.addToastMessage(toast as ToastItem);
      }

      if (action === actionType.editPassword) {
        await dispatch(updatePassword(values)).unwrap();

        const toast = {
          type: 'success',
          description: text.updatePasswordSuccess,
        };

        appContext?.addToastMessage(toast as ToastItem);
      }

      actions.setSubmitting(false);
    } catch (err) {
      const toast = {
        type: 'warning',
        description: translateErrorMessage(err.reason),
      };

      appContext?.addToastMessage(toast as ToastItem);
    }
  }, []);

  return (
    <div className={b()}>
      <header className={b('head')}>
        <Avatar className={b('pic')} size="10rem" src={getResourceURL(user.avatar)} populatable>
          <Filepick
            className={b('pic-setter')}
            title={txt.editAvatarTitle}
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
          onSubmit={submitProfile}
        >
          {({ isSubmitting }) => (
            <Form data-action={action} className="js-profile__form" noValidate>
              <table className={b('table')}>
                <tbody className={b('table-body')}>
                  {(action === actionType.edit || !action) && (
                    <>
                      <ProfileTableRow
                        label={txt.emailLabel}
                        value={user.email}
                        id="email"
                        inputType="email"
                        action={action}
                      />
                      <ProfileTableRow
                        label={txt.loginLabel}
                        value={user.login}
                        id="login"
                        action={action}
                      />
                      <ProfileTableRow
                        label={txt.firstNameLabel}
                        value={user.firstName}
                        id="firstName"
                        action={action}
                      />
                      <ProfileTableRow
                        label={txt.secondNameLabel}
                        value={user.secondName}
                        id="secondName"
                        action={action}
                      />
                      <ProfileTableRow
                        label={txt.nickNameLabel}
                        value={user.displayName}
                        id="displayName"
                        action={action}
                      />
                    </>
                  )}
                  {action === actionType.editPassword && (
                    <>
                      <ProfileTableRow
                        label={txt.oldPasswordLabel}
                        value={user.password}
                        id="oldPassword"
                        inputType="password"
                        autoComplete="current-password"
                        action={action}
                      />
                      <ProfileTableRow
                        label={txt.newPasswordLabel}
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
                              children: txt.editButton,
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
                              children: txt.editPasswordButton,
                            })}
                          />
                        </td>
                      </tr>
                      <tr className={b('table-row')}>
                        <td colSpan={2} className={b('table-cell')}>
                          <Button onClick={doLogout} waiting={isLoggingOut} theme="link-danger">
                            {txt.logoutButton}
                          </Button>
                        </td>
                      </tr>
                    </>
                  )}
                  {action && (
                    <tr className={b('table-row')}>
                      <td colSpan={2} className={b('table-cell')}>
                        <Button type="submit" waiting={isSubmitting}>
                          {txt.saveButton}
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

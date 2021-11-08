import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { replace } from 'connected-react-router';
import { Form, Formik } from 'formik';

import AppContext from '@/AppContext';
import { Input } from '@/components/formik-ui';
import { Avatar, Button, Filepick, Spinner } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import { SizeLabels } from '@/shared/const/const';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import translateError from '@/shared/utils';
import getResourceURL from '@/shared/utils/getResourceURL';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import {
  getProfile,
  logout,
  updateAvatar,
  updatePassword,
  updateProfile,
} from '@/store/reducers/actions';
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
  action?: 'edit' | 'edit-password';
};
type ProfileRouteParams = {
  userId?: string;
};

function Profile({ action }: ProfileProps): JSX.Element {
  const appContext = useContext(AppContext);
  const { userId: profileUserId } = useParams<ProfileRouteParams>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);
  const renderedProfile = profileUserId ? profile : user;
  const { firstName, secondName, displayName, login, email, phone, avatar } = renderedProfile;
  const { isLoggingOut, isChangingAvatar } = user;

  const handleAvatarChange = useCallback(async (e) => {
    const formData = new FormData();

    formData.append('avatar', e.target.files[0]);

    try {
      await dispatch(updateAvatar(formData)).unwrap();

      e.target.value = '';

      const toast = {
        type: 'success',
        description: txt.updateAvatarSuccess,
      };

      appContext?.addToastMessage(toast as ToastItem);
    } catch (err) {
      const toast = {
        type: 'warning',
        description: translateError(err),
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
          description: txt.updateProfileSuccess,
        };

        appContext?.addToastMessage(toast as ToastItem);
      }

      if (action === actionType.editPassword) {
        await dispatch(updatePassword(values)).unwrap();

        const toast = {
          type: 'success',
          description: txt.updatePasswordSuccess,
        };

        appContext?.addToastMessage(toast as ToastItem);
      }

      actions.setSubmitting(false);
    } catch (err) {
      const toast = {
        type: 'warning',
        description: translateError(err),
      };

      appContext?.addToastMessage(toast as ToastItem);
    }
  }, []);

  useLayoutEffect(() => {
    const loadProfile = async () => {
      if (!profileUserId) {
        return;
      }

      if (Number.isNaN(Number(profileUserId))) {
        dispatch(replace(paths.NOT_FOUND));

        return;
      }

      try {
        const profileData = await dispatch(getProfile(Number(profileUserId))).unwrap();

        if (!profileData) {
          dispatch(replace(paths.NOT_FOUND));
        }
      } catch (e) {
        const toast = {
          type: 'warning',
          description: translateError(e),
        };

        appContext?.addToastMessage(toast as ToastItem);
      }
    };

    loadProfile();
  }, [profileUserId, dispatch]);

  return (
    <div className={b()}>
      {profile.isLoading ? (
        <Spinner className={b('spinner')} size={SizeLabels.LG} />
      ) : (
        <>
          <header className={b('head')}>
            <Avatar
              className={b('pic')}
              size="10rem"
              src={avatar && getResourceURL(avatar)}
              populatable
            >
              {isChangingAvatar && (
                <>
                  <div className={b('pic-dimmer')}></div>
                  <Spinner className={b('pic-spinner')} size={SizeLabels.LG} />
                </>
              )}
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
            <h4 className={b('name').mix('heading_4', 'heading')}>{firstName}</h4>
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
                            value={email}
                            id="email"
                            inputType="email"
                            action={action}
                          />
                          <ProfileTableRow
                            label={txt.phoneLabel}
                            value={phone}
                            id="phone"
                            inputType="tel"
                            action={action}
                          />
                          <ProfileTableRow
                            label={txt.loginLabel}
                            value={login}
                            id="login"
                            action={action}
                          />
                          <ProfileTableRow
                            label={txt.firstNameLabel}
                            value={firstName}
                            id="firstName"
                            action={action}
                          />
                          <ProfileTableRow
                            label={txt.secondNameLabel}
                            value={secondName}
                            id="secondName"
                            action={action}
                          />
                          <ProfileTableRow
                            label={txt.nickNameLabel}
                            value={displayName || ''}
                            id="displayName"
                            action={action}
                          />
                        </>
                      )}
                      {action === actionType.editPassword && (
                        <>
                          <ProfileTableRow
                            label={txt.oldPasswordLabel}
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
                    {!profileUserId && (
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
                                <Button
                                  onClick={doLogout}
                                  waiting={isLoggingOut}
                                  theme="link-danger"
                                >
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
                    )}
                  </table>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

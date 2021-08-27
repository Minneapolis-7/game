import { UpdatePasswordRequest, UpdateProfileRequest } from '@/api/types';
import api from '@/api/userApi';
import {
  reguestedFailed,
  updateAvatarReguested,
  updateAvatarSucceeded,
  updatePasswordReguested,
  updatePasswordSucceeded,
  updateProfileReguested,
  updateProfileSucceeded,
} from '@/store/reducers/index';
import { AppDispatch } from '@/store/store';

export const updateProfile = (user: UpdateProfileRequest) => {
  return (dispatch: AppDispatch): void => {
    dispatch(updateProfileReguested);

    api
      .updateProfile(user)
      .then((res) => {
        dispatch(updateProfileSucceeded(res));
      })
      .catch((err) => {
        dispatch(reguestedFailed(err.message));
      });
  };
};

export const updateAvatar = (formData: FormData) => {
  return (dispatch: AppDispatch): void => {
    dispatch(updateAvatarReguested);

    api
      .updateAvatar(formData)
      .then((res) => {
        dispatch(updateAvatarSucceeded(res));
      })
      .catch((err) => {
        dispatch(reguestedFailed(err.message));
      });
  };
};

export const updatePassword = (password: UpdatePasswordRequest) => {
  return (dispatch: AppDispatch): void => {
    dispatch(updatePasswordReguested);

    api
      .updatePassword(password)
      .then(() => {
        dispatch(updatePasswordSucceeded);
      })
      .catch((err) => {
        dispatch(reguestedFailed(err.message));
      });
  };
};

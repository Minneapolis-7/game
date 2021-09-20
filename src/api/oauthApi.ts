import { apiYandex } from './api';
import { OAuthClientIdRequest, OauthSignInRequest } from './types';

export default {
  async getClientId(params: OAuthClientIdRequest): Promise<string> {
    const { data } = await apiYandex.get<{ serviceId: string }>('/oauth/yandex/service-id', {
      params,
    });

    return data.serviceId;
  },

  async signin(data: OauthSignInRequest): Promise<void> {
    await apiYandex.post('/oauth/yandex', data);
  },
};

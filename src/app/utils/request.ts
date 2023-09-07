import { getAuthority } from './authority';
import axios, { AxiosRequestConfig } from 'axios';
import i18n from 'app/trans/i18n';
import Toastconfig from 'assets/toast';
import { errorMessage } from 'app/trans';
import store from 'app/redux/store';
import { logOutAndDeleteToken } from 'app/redux/Slices/AccountsSlice';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 4000,
  withCredentials: false,
});
instance.interceptors.request //REQUEST
  .use(
    async function (config) {
      if (typeof window !== 'undefined') {
        // client side
        const authority = getAuthority();
        const headers = { ...config.headers };
        if (authority) {
          headers['Authorization'] = `Bearer ${authority}`;
        }
        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers['Content-Type'] = 'application/json';
        headers['Accept-Language'] = i18n.language === 'korean' ? 'kr' : 'en';
        config.headers = headers;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
instance.interceptors.response.use(
  async function (response) {
    console.log('axios interceptor 1');
    if (typeof window !== 'undefined') {
      // console.log('response.status', response.status);
      // if (response.status === 401) {
      //   // removeAuthority();
      //   removeAuthority();
      //   await axios.post('/api/auth/logout');
      //   window.location.href = '/';
      // }
    } else {
      console.log('response.status.server', response.status);
    }
    return response;
  },
  async (error) => {
    console.log('axios interceptor 2');
    console.log(error);
    if (typeof window !== 'undefined') {
      if (error.response.status === 401 && !error.request.responseURL.includes('/user/logout')) {
        Toastconfig.error(i18n.t(errorMessage.unauthentication));
        console.log(error.response.status);

        await store.dispatch(logOutAndDeleteToken());
      }
    }
    // return response;
    return { response: error.response, data: error.response.data };
  },
);

const request = (url: string, options: Partial<AxiosRequestConfig>) => {
  return instance.request({ ...options, url: url });
};

export const requestWithToken = (
  url: string,
  token: string,
  options: Partial<AxiosRequestConfig>,
) => {
  const headers = { ...options.headers };
  headers['Authorization'] = `Bearer ${token}`;
  options.headers = headers;
  return instance.request({ ...options, url: url });
};

export default request;

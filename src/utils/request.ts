import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from 'antd';
import settings from '@/config/settings';
import { getToken, getRole } from '@/utils/localToken';

export interface ResponseData<T = unknown> {
  totalCount: number;
  code?: number;
  data?: T;
  message?: string;
  totalPage?: number;
  totalItems?: number;
  pageNumber?: number;
  pageSize?: number
}

export interface ResponseDetailsData<T = unknown> {
  responseCode?: number;
  data?: T;
  responseMessage?: string;
}

export interface IResponseData {
  list: object[];
  total: number;
}

export interface PaginationConfig {
  total: any;
  current: any;
  pageSize: any;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
}
const customCodeMessage: { [key: number]: string } = {
  10002: 'Thông tin đăng nhập người dùng hiện tại không hợp lệ, vui lòng đăng nhập lại',
};

const serverCodeMessage: { [key: number]: string } = {
  200: 'Success',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

/**
 * exception
 */
const errorHandler = (error: any) => {
  const { response, message } = error;
  if (message === 'CustomError') {
    const { config, data } = response;
    const { url, baseURL } = config;
    const { code, message } = data;
    const reqUrl = url.split('?')[0].replace(baseURL, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: `Lỗi`,
        description: customCodeMessage[code] || message || 'Lỗi lấy dữ liệu',
      });

      if (code === 10002 || code === 401) {
        setTimeout(() => {
          window.location.href = '/user/login';
        }, 500);
      }
    }
  } else if (message === 'CancelToken') {
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    notification.error({
      message: `Lỗi ${status}: ${request.responseURL}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Lỗi kết nối mạng hoặc server bị mất kết nối',
      message: 'Lỗi mạng',
    });
  }

  return Promise.reject(error);
};

/**
 * request
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_APIHOST || '', // url = api url + request url
  withCredentials: false,
  timeout: 0,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig & { cType?: boolean }) => {
    // Content-Type
    if (config.cType) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['appId'] = 'FC1E5A4B-3027-43F2-BE61-8CB5FF60D2A7';

    // add token header
    const accessToken = getToken();
    if (accessToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers[settings.siteRole] = 'admin';
      config.headers[settings.accessToken] = accessToken;
    }
    return config;
  },
);

request.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const res = response.data;
    const { code } = res;

    if (code !== 0 && code !== 200) {
      return Promise.reject({
        response,
        message: 'CustomError',
      });
    }

    return response;
  },
);

export default function ajax<T = any, R = AxiosResponse<T>>(
  config: AxiosRequestConfig & { cType?: boolean },
): AxiosPromise<R> {
  return request(config)
    .then((response: AxiosResponse) => response.data)
    .catch((error) => errorHandler(error));
}

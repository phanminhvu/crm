/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NavigationModel } from "../models/NavigationModel";
import type { ResponseData } from "../models/ResponseData";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * @param appId
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getNavigation = (
  appId?: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Navigation`,
    headers: {
      appId: appId,
    },
  });
};

/**
 * @param appId
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postNavigation = (
  appId?: string,
  requestBody?: NavigationModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Navigation`,
    headers: {
      appId: appId,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @param appId
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getNavigation1 = (
  id: string,
  appId?: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Navigation/${id}`,
    headers: {
      appId: appId,
    },
  });
};

/**
 * @param id
 * @param appId
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putNavigation = (
  id: string,
  appId?: string,
  requestBody?: NavigationModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "PUT",
    path: `/Navigation/${id}`,
    headers: {
      appId: appId,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @param appId
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteNavigation = (
  id: string,
  appId?: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "DELETE",
    path: `/Navigation/${id}`,
    headers: {
      appId: appId,
    },
  });
};

export const useGetNavigationService1 = (
  options: UseRequestOption
): {
  run: (appId?: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getNavigation, options);
};

export const usePostNavigationService = (
  options: UseRequestOption
): {
  run: (appId?: string, requestBody?: NavigationModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postNavigation, options);
};

export const useGetNavigationService = (
  options: UseRequestOption
): {
  run: (id: string, appId?: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getNavigation1, options);
};

export const usePutNavigationService = (
  options: UseRequestOption
): {
  run: (id: string, appId?: string, requestBody?: NavigationModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putNavigation, options);
};

export const useDeleteNavigationService = (
  options: UseRequestOption
): {
  run: (id: string, appId?: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteNavigation, options);
};


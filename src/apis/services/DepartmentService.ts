/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartmentModel } from "../models/DepartmentModel";
import type { ResponseData } from "../models/ResponseData";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getDepartment = (): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Department`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postDepartment = (
  requestBody?: DepartmentModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Department`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getDepartment1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Department/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putDepartment = (
  id: string,
  requestBody?: DepartmentModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "PUT",
    path: `/Department/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteDepartment = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "DELETE",
    path: `/Department/${id}`,
  });
};

export const useGetDepartmentService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getDepartment, options);
};

export const usePostDepartmentService = (
  options: UseRequestOption
): {
  run: (requestBody?: DepartmentModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postDepartment, options);
};

export const useGetDepartmentService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getDepartment1, options);
};

export const usePutDepartmentService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: DepartmentModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putDepartment, options);
};

export const useDeleteDepartmentService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteDepartment, options);
};


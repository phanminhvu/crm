/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyGroupModel } from "../models/CompanyGroupModel";
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
export const getCompanyGroup = (current : number, pagesize: number ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyGroup?pageNumber=${current}&pageSize=${pagesize}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyGroup = (
  requestBody?: CompanyGroupModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyGroup`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanyGroup1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyGroup/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanyGroup = (
  id: string,
  requestBody?: CompanyGroupModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyGroup/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyGroup = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyGroup/delete/${id}`,
  });
};

export const usegetCompanyGroupService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyGroup, options);
};

export const usepostCompanyGroupService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyGroupModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyGroup, options);
};

export const usegetCompanyGroupService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyGroup1, options);
};

export const usePutCompanyGroupService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyGroupModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanyGroup, options);
};

export const useDeleteCompanyGroupService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyGroup, options);
};


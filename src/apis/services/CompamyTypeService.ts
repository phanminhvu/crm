/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTypeModel } from "../models/CompanyTypeModel";
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
export const getCompanyType = (current : number, pagesize: number ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyType?pageNumber=${current}&pageSize=${pagesize}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyType = (
  requestBody?: CompanyTypeModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyType`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanyType1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyType/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanyType = (
  id: string,
  requestBody?: CompanyTypeModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyType/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyType = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyType/delete/${id}`,
  });
};

export const usegetCompanyTypeService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyType, options);
};

export const usepostCompanyTypeService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyTypeModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyType, options);
};

export const usegetCompanyTypeService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyType1, options);
};

export const usePutCompanyTypeService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyTypeModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanyType, options);
};

export const useDeleteCompanyTypeService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyType, options);
};


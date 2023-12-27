/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyModel } from "../models/CompanyModel";
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
export const getCompany = (current : number, pagesize: number ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Company?pageNumber=${current}&pageSize=${pagesize}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompany = (
  requestBody?: CompanyModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Company`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompany1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Company/id?id=${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompany = (
  id: string,
  requestBody?: CompanyModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Company/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompany = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Company/delete/${id}`,
  });
};

export const usegetCompanyService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompany, options);
};

export const usepostCompanyService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompany, options);
};

export const usegetCompanyService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompany1, options);
};

export const usePutCompanyService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompany, options);
};

export const useDeleteCompanyService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompany, options);
};


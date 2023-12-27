/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanySystemModel } from "../models/CompanySystemModel";
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
export const getCompanySystem = (id : string ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanySystem?companyId=${id}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanySystem = (
  requestBody?: CompanySystemModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanySystem`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanySystem1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanySystem/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanySystem = (
  id: string,
  requestBody?: CompanySystemModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanySystem/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanySystem = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanySystem/delete/${id}`,
  });
};

export const usegetCompanySystemService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanySystem, options);
};

export const usepostCompanySystemService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanySystemModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanySystem, options);
};

export const usegetCompanySystemService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanySystem1, options);
};

export const usePutCompanySystemService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanySystemModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanySystem, options);
};

export const useDeleteCompanySystemService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanySystem, options);
};


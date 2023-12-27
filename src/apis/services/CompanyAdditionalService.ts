/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyAdditionalModel } from "../models/CompanyAdditionalModel";
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
export const getCompanyAdditional = (id : string ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyAdditional/GetByCompanyId?companyId=${id}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyAdditional = (
  requestBody?: CompanyAdditionalModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyAdditional`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanyAdditional1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyAdditional/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanyAdditional = (
  id: string,
  requestBody?: CompanyAdditionalModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyAdditional/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyAdditional = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyAdditional/delete/${id}`,
  });
};

export const usegetCompanyAdditionalService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyAdditional, options);
};

export const usepostCompanyAdditionalService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyAdditionalModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyAdditional, options);
};

export const usegetCompanyAdditionalService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyAdditional1, options);
};

export const usePutCompanyAdditionalService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyAdditionalModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanyAdditional, options);
};

export const useDeleteCompanyAdditionalService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyAdditional, options);
};


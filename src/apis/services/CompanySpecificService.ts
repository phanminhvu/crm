/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
export const getCompanySpecific = (id : string ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanySpecific?companyId=${id}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanySpecific = (
  requestBody?: any
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanySpecific`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanySpecific1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanySpecific/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanySpecific = (
  id: string,
  requestBody?: any
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanySpecific/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanySpecific = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanySpecific/delete/${id}`,
  });
};

export const usegetCompanySpecificService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanySpecific, options);
};

export const usepostCompanySpecificService = (
  options: UseRequestOption
): {
  run: (requestBody?: any) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanySpecific, options);
};

export const usegetCompanySpecificService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanySpecific1, options);
};

export const usePutCompanySpecificService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: any) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanySpecific, options);
};

export const useDeleteCompanySpecificService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanySpecific, options);
};


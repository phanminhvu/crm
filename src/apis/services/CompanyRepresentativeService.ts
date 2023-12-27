/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyRepresentativeModel } from "../models/CompanyRepresentativeModel";
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
export const getCompanyRepresentative = (id : string ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyRepresentative?companyId=${id}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyRepresentative = (
  requestBody?: CompanyRepresentativeModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyRepresentative`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanyRepresentative1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyRepresentative/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanyRepresentative = (
  id: string,
  requestBody?: CompanyRepresentativeModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyRepresentative/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyRepresentative = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyRepresentative/delete/${id}`,
  });
};

export const usegetCompanyRepresentativeService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyRepresentative, options);
};

export const usepostCompanyRepresentativeService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyRepresentativeModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyRepresentative, options);
};

export const usegetCompanyRepresentativeService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyRepresentative1, options);
};

export const usePutCompanyRepresentativeService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyRepresentativeModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanyRepresentative, options);
};

export const useDeleteCompanyRepresentativeService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyRepresentative, options);
};


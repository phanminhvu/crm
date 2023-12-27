/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyCopperationModel } from "../models/CompanyCopperationModel";
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
export const getCompanyCopperation = (id : string ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyCopperation/GetByCompanyId?companyId=${id}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyCopperation = (
  requestBody?: CompanyCopperationModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyCopperation`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanyCopperation1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyCopperation/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanyCopperation = (
  id: string,
  requestBody?: CompanyCopperationModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyCopperation/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyCopperation = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyCopperation/delete/${id}`,
  });
};

export const usegetCompanyCopperationService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyCopperation, options);
};

export const usepostCompanyCopperationService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyCopperationModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyCopperation, options);
};

export const usegetCompanyCopperationService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyCopperation1, options);
};

export const usePutCompanyCopperationService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyCopperationModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanyCopperation, options);
};

export const useDeleteCompanyCopperationService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyCopperation, options);
};


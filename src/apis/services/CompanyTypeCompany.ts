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


/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyTypeCompany = (
  requestBody?: any
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyTypeCompany`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */


/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */


/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyTypeCompany = (
  companyId: string,
  companyTypeId: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyTypeCompany/delelte?companyId=${companyId}&companyTypeId=${companyTypeId}`,
  });
};



export const usepostCompanyTypeCompanyService = (
  options: UseRequestOption
): {
  run: (requestBody?: any) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyTypeCompany, options);
};



export const useDeleteCompanyTypeCompanyService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyTypeCompany, options);
};


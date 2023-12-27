/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyDocumentModel } from "../models/CompanyDocumentModel";
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
export const getCompanyDocument = (id : string ): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyDocument?companyId=${id}`,
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCompanyDocument = (
  requestBody?: CompanyDocumentModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyDocument`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCompanyDocument1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/CompanyDocument/id?id=${id}`,

  });
};



export const uploadDocument = (file: any): CancelablePromise<ResponseData> => {
 console.log(file, 'alo')
  return __request({
    method: "POST",
    path: `/CompanyDocument/upload`,
    formData: {file : file},
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCompanyDocument = (
  id: string,
  requestBody?: CompanyDocumentModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyDocument/update/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCompanyDocument = (
  id: string
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/CompanyDocument/delete/${id}`,
  });
};

export const usegetCompanyDocumentService1 = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyDocument, options);
};

export const usepostCompanyDocumentService = (
  options: UseRequestOption
): {
  run: (requestBody?: CompanyDocumentModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCompanyDocument, options);
};

export const usegetCompanyDocumentService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCompanyDocument1, options);
};

export const usePutCompanyDocumentService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CompanyDocumentModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCompanyDocument, options);
};

export const useDeleteCompanyDocumentService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCompanyDocument, options);
};


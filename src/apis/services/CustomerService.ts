/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerModel } from "../models/CustomerModel";
import type { ResponseData } from "../models/ResponseData";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * @param filter
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCustomer = (
  filter: string | null = "{}"
): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Customer`,
    query: {
      filter: filter,
    },
  });
};

/**
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCustomer = (
  requestBody?: CustomerModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Customer`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCustomer1 = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Customer/${id}`,
  });
};

/**
 * @param id
 * @param requestBody
 * @returns ResponseData Success
 * @throws ApiError
 */
export const putCustomer = (
  id: string,
  requestBody?: CustomerModel
): CancelablePromise<ResponseData> => {
  return __request({
    method: "PUT",
    path: `/Customer/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * @param id
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteCustomer = (id: string): CancelablePromise<ResponseData> => {
  return __request({
    method: "DELETE",
    path: `/Customer/${id}`,
  });
};

/**
 * @param formData
 * @returns ResponseData Success
 * @throws ApiError
 */
export const postCustomer1 = (formData?: {
  file?: Blob | null;
}): CancelablePromise<ResponseData> => {
  return __request({
    method: "POST",
    path: `/Customer/import`,
    formData: formData,
    mediaType: "multipart/form-data",
  });
};

/**
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getCustomer2 = (): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/Customer/Download-File-Import`,
  });
};

// export const useGetCustomerService = (
//   options: UseRequestOption
// ): {
//   run: (filter: string | null = "{}") => void;
//   data: ResponseData;
//   loading: boolean;
//   error?: Error;
//   params?: any;
// } => {
//   return useRequest(getCustomer, options);
// };

// export const usePostCustomerService = (
//   options: UseRequestOption
// ): {
//   run: (requestBody?: CustomerModel) => void;
//   data: ResponseData;
//   loading: boolean;
//   error?: Error;
//   params?: any;
// } => {
//   return useRequest(postCustomer, options);
// };

// export const useGetCustomerService = (
//   options: UseRequestOption
// ): {
//   run: (id: string) => void;
//   data: ResponseData;
//   loading: boolean;
//   error?: Error;
//   params?: any;
// } => {
//   return useRequest(getCustomer1, options);
// };

export const usePutCustomerService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody?: CustomerModel) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(putCustomer, options);
};

export const useDeleteCustomerService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteCustomer, options);
};

export const usePostCustomerService = (
  options: UseRequestOption
): {
  run: (formData?: { file?: Blob | null }) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postCustomer1, options);
};

export const useGetCustomerService = (
  options: UseRequestOption
): {
  run: () => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getCustomer2, options);
};


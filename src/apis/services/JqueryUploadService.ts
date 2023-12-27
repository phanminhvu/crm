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
 * @param formData
 * @returns any Success
 * @throws ApiError
 */
export const postJqueryUpload = (formData?: {
  files?: Array<Blob> | null;
}): CancelablePromise<any> => {
  return __request({
    method: "POST",
    path: `/JqueryUpload/UploadFiles`,
    formData: formData,
    mediaType: "multipart/form-data",
  });
};

/**
 * @param url
 * @returns ResponseData Success
 * @throws ApiError
 */
export const deleteJqueryUpload = (
  url?: string | null
): CancelablePromise<ResponseData> => {
  return __request({
    method: "DELETE",
    path: `/JqueryUpload/DeleteFile`,
    query: {
      url: url,
    },
  });
};

/**
 * @param fileName
 * @returns ResponseData Success
 * @throws ApiError
 */
export const getJqueryUpload = (
  fileName?: string | null
): CancelablePromise<ResponseData> => {
  return __request({
    method: "GET",
    path: `/JqueryUpload/GetImageFile`,
    query: {
      fileName: fileName,
    },
  });
};

export const usePostJqueryUploadService = (
  options: UseRequestOption
): {
  run: (formData?: { files?: Array<Blob> | null }) => void;
  data: any;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(postJqueryUpload, options);
};

export const useDeleteJqueryUploadService = (
  options: UseRequestOption
): {
  run: (url?: string | null) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(deleteJqueryUpload, options);
};

export const useGetJqueryUploadService = (
  options: UseRequestOption
): {
  run: (fileName?: string | null) => void;
  data: ResponseData;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(getJqueryUpload, options);
};


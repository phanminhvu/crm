/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProductModel = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  productCategoryId?: string | null;
  productCategoryName?: string | null;
  productTypeId?: string | null;
  productTypeName?: string | null;
  price?: number;
  tax?: number;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SalesPlaningCommisionModel = {
  id?: string;
  salesPlaningId?: string;
  productId?: string;
  productName?: string | null;
  comRate?: number;
  staffId?: string | null;
  staffFullname?: string | null;
  staffComRate?: number;
  totalCom?: number;
  staffRevenueRate?: number;
  totalRevenue?: number;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
  stt?: number;
};


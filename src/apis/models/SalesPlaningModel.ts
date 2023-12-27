/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContractModel } from "./ContractModel";
import type { CustomerCategoryModel } from "./CustomerCategoryModel";
import type { CustomerTypeModel } from "./CustomerTypeModel";
import type { SalesPlaningCommisionModel } from "./SalesPlaningCommisionModel";
import type { SalesPlaningPaymentModel } from "./SalesPlaningPaymentModel";
import type { SalesPlaningProductModel } from "./SalesPlaningProductModel";

export type SalesPlaningModel = {
  id?: string;
  contractNumber?: string | null;
  name?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  implementationDate?: string | null;
  contractValue?: number;
  customerId?: string | null;
  customerName?: string | null;
  provinceId?: string | null;
  provinceName?: string | null;
  districtId?: string | null;
  districtName?: string | null;
  customerTypeInfor?: CustomerTypeModel;
  customerType?: string | null;
  customerTypeName?: string | null;
  customerCategoryInfor?: CustomerCategoryModel;
  customerCategory?: string | null;
  customerStatus?: number;
  customerProperty?: number;
  isMOU?: boolean;
  contractId?: string | null;
  state?: number;
  cost?: number;
  costTaxRate?: number;
  totalCostTax?: number;
  implementationCost?: number;
  costDescription?: string | null;
  departmentId?: string | null;
  departmentName?: string | null;
  username?: string | null;
  contractProperty?: number;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
  contractName?: string | null;
  salesPlaningProducts?: Array<SalesPlaningProductModel> | null;
  salesPlaningCommisions?: Array<SalesPlaningCommisionModel> | null;
  salesPlaningPayments?: Array<SalesPlaningPaymentModel> | null;
  contract?: ContractModel;
};


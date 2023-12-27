/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentCommandModel } from "./DocumentCommandModel";
import type { SalesPlaningPaymentCostModel } from "./SalesPlaningPaymentCostModel";
import type { SalesPlaningProductPaymentModel } from "./SalesPlaningProductPaymentModel";

export type SalesPlaningPaymentModel = {
  id?: string | null;
  salesPlaningId?: string | null;
  type?: number;
  amount?: number;
  paymentDate?: string | null;
  description?: string | null;
  content?: string | null;
  suggestedDate?: string | null;
  filePath?: string | null;
  fileName?: string | null;
  file?: Blob | null;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
  documentId?: string | null;
  departmentId?: string | null;
  commands?: Array<DocumentCommandModel> | null;
  state?: string | null;
  stateName?: string | null;
  productPaymentModels?: Array<SalesPlaningProductPaymentModel> | null;
  salesPlaningPaymentCosts?: Array<SalesPlaningPaymentCostModel> | null;
};


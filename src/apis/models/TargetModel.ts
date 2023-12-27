/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentCommandModel } from "./DocumentCommandModel";
import type { HistoryTargetModel } from "./HistoryTargetModel";
import type { TargetMappingModel } from "./TargetMappingModel";
import type { UserModel } from "./UserModel";

export type TargetModel = {
  id?: string;
  type?: number;
  typeName?: string | null;
  year?: number;
  departmentId?: string | null;
  departmentName?: string | null;
  username?: string | null;
  productId?: string | null;
  productName?: string | null;
  customerId?: string | null;
  customerName?: string | null;
  jan?: number;
  quantityJan?: number;
  feb?: number;
  quantityFeb?: number;
  mar?: number;
  quantityMar?: number;
  apr?: number;
  quantityApr?: number;
  may?: number;
  quantityMay?: number;
  jun?: number;
  quantityJun?: number;
  july?: number;
  quantityJuly?: number;
  aug?: number;
  quantityAug?: number;
  sep?: number;
  quantitySep?: number;
  oct?: number;
  quantityOct?: number;
  nov?: number;
  quantityNov?: number;
  dec?: number;
  quantityDec?: number;
  total?: number;
  totalQuantity?: number;
  documentId?: string | null;
  commands?: Array<DocumentCommandModel> | null;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
  state?: string | null;
  stateName?: string | null;
  targets?: Array<TargetMappingModel> | null;
  fullname?: string | null;
  historyTarget?: HistoryTargetModel;
  users?: Array<UserModel> | null;
  userNotification?: Array<string> | null;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SalesPlaningProductModel = {
  id?: string;
  salesPlaningId?: string;
  productId?: string;
  productName?: string | null;
  defaultPrice?: number;
  implementationPrice?: number;
  amount?: number;
  quantily?: number;
  totalPrice?: number;
  vat?: number;
  l1Rate?: number;
  l1Cost?: number;
  l2Rate?: number;
  l2Cost?: number;
  l3Rate?: number;
  l3Cost?: number;
  l4Rate?: number;
  l4Cost?: number;
  l1RateDefault?: number;
  l1CostDefault?: number;
  l2RateDefault?: number;
  l2CostDefault?: number;
  l3RateDefault?: number;
  l3CostDefault?: number;
  l4RateDefault?: number;
  l4CostDefault?: number;
  comRate?: number;
  totalRate?: number;
  totalPriceWithRate?: number;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
  totalPriceComExcludingVAT?: number;
  stt?: number;
  vatCost?: number;
  totalCom?: number;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentCommandModel } from "./DocumentCommandModel";

export type AcceptanceCertificateModel = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  contractId?: string;
  departmentId?: string | null;
  contractName?: string | null;
  contractNumber?: string | null;
  file?: Blob | null;
  filePath?: string | null;
  fileName?: string | null;
  date?: string | null;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
  documentId?: string | null;
  commands?: Array<DocumentCommandModel> | null;
  type?: number | null;
  state?: string | null;
  stateName?: string | null;
};


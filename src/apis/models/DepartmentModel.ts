/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DepartmentModel = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  level?: number;
  parentId?: string | null;
  parentName?: string | null;
  branchId?: string | null;
  branchName?: string | null;
  manager?: string | null;
  managerName?: string | null;
  isCom?: boolean;
  createdByUserId?: string;
  lastModifiedByUserId?: string;
  lastModifiedOnDate?: string;
  createdOnDate?: string;
};


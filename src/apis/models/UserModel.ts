/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserModel = {
  id?: string;
  username?: string | null;
  fullname?: string | null;
  name?: string | null;
  code?: string | null;
  appId?: string;
  isLocked?: boolean;
  roleId?: string | null;
  role?: string | null;
  roleName?: string | null;
  email?: string | null;
  departmentId?: string | null;
  departmentName?: string | null;
  structDivisionId?: string | null;
  managerId?: string | null;
  manager?: string | null;
  employeeAccessLevels?: string | null;
  employeeAccessLevelArray?: Array<string> | null;
  isAccessMaxLevel?: boolean;
};


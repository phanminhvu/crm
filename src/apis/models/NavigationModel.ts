/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NavigationModel = {
  id?: string;
  parentId?: string | null;
  code?: string | null;
  name?: string | null;
  url?: string | null;
  iconClass?: string | null;
  order?: number;
  hasChild?: boolean;
  appId?: string;
  isDeleted?: boolean;
  resource?: string | null;
  children?: Array<NavigationModel> | null;
};


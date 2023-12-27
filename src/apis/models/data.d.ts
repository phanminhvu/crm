export interface UserInfoDataType {
  name: string;
  tel: string;
  courier: string;
  address: string;
  remark: string;
}

export interface RefundApplicationDataType {
  ladingNo: string;
  saleNo: string;
  state: string;
  childOrders: string;
}

export interface ReturnGoodsDataType {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface ReturnProgressDataType {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface DetailDataType {
  userInfo: UserInfoDataType;
  refundApplication: RefundApplicationDataType;
  returnGoods: ReturnGoodsDataType[];
  returnProgress: ReturnProgressDataType[];
}

export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface WorksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface TableListQueryParams {
  page: number;
  per: number;
  sort?: number;
}

export interface PaginationConfig {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
}
export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface TopicsChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}
export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface ArticleChartDataType {
  total: number;
  num: number;
  week: number;
  day: number;
}

export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface LinksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface TopicsChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface TableListItem {
  name: string;
  hit: number;
}
export interface FormDataType {
  title: string;
  date: string[];
  select: string;
  radio1: string;
  radio2: string;
  checkbox: string[];
  remark: string;
  users?: TableFormDataType[];
}

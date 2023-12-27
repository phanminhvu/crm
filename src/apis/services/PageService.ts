import { TableListQueryParams, FormDataType } from '@/apis/models/data';
import {
  request,
  useRequest,
  UseRequestOption,
} from "../core/request";

export async function createData(params?: FormDataType): Promise<any> {
  return ;
}

export async function queryDetail(): Promise<any> {
  return;
}

export async function hotSearchQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    path: "/home/searchs/keywords",
    method: "GET",
    body: params,
  });
}

export async function hotTagsQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    path: '/home/tags',
    method: "GET",
    body: params,
  });
}

export async function articleHitQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    path: '/home/articles',
    method: "GET",
    body: params,
  });
}

export async function worksHitQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    path: '/home/works',
    method: "GET",
    body: params,
  });
}

export async function dailynewArticles(): Promise<any> {
  return request({
    path: '/home/articles/dailynew',
    method: "GET",
  });
}

export async function annualnewLinks(): Promise<any> {
  return request({
    path: '/home/links/annualnew',
    method: "GET",
  });
}

export async function monthnewTopics(): Promise<any> {
  return request({
    path: '/home/topics/monthnew',
    method: "GET",
  });
}

export async function weeknewWorks(): Promise<any> {
  return request({
    path: '/home/works/weeknew',
    method: "GET",
  });
}
export async function queryCurrent(): Promise<any> {
  return {"code":0,"data":{"id":1,"name":"Admins","avatar":"","roles":["admin"]}};
}

export async function queryMessage(): Promise<any> {
  return {"code":0,"data":19};
}

export async function getStatusAuth(): Promise<any> {
  return request({
    path: 'https://localhost:7188/Auth/getStatusAuth?code=' +  localStorage.getItem('access_token'),
    method: "GET",
  });
}
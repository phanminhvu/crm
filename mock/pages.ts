import mockjs from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
const ajaxHeadersTokenKey = 'x-token';
export default [
  {
    url: '/api/pages/list/:id',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 0,
        data: mockjs.mock({
          id: '@integer(1)',
          'name|1': ['name 1', 'name 2'],
          'desc|1': ['Test text 1', 'Text 2'],
          'href|1': ['http://iigVietnam.com', 'http://iigVietnam.com'],
          'type|1': ['header', 'footer'],
        }),
      };
    },
  },
  {
    url: '/api/pages/list',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 0,
        data: mockjs.mock({
          total: 1000,
          currentPage: 1,
          'list|10': [
            {
              id: '@integer(1)',
              'name|1': ['name 1', 'name 2'],
              'desc|1': ['Test text 1', 'Text 2'],
              'href|1': ['http://iigVietnam.com', 'http://iigVietnam.com'],
              'type|1': ['header', 'footer'],
            },
          ],
        }),
      };
    },
  },
  {
    url: '/api/pages/list',
    method: 'post',
    response: ({ headers, body }) => {
      return {
        code: 0,
        data: '',
      };
    },
  },
  {
    url: '/api/pages/list/:id',
    method: 'put',
    response: ({ headers, body }) => {
      return {
        code: 0,
        data: '',
      };
    },
  },
  {
    url: '/api/pages/list/:id',
    method: 'delete',
    response: ({ headers, body }) => {
      return {
        code: 0,
        data: '',
      };
    },
  },
  {
    url: '/api/pages/form',
    method: 'post',
    response: ({ headers, body }) => {
      return {
        code: 0,
        data: '',
      };
    },
  },
  {
    url: '/api/pages/detail',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 0,
        data: mockjs.mock({
          userInfo: {
            name: 'Trường',
            tel: '13770779817',
            courier: 'Dev',
            address: 'Hà Nội',
            remark: 'Đã tốt nghiệp mầm non',
          },
          'returnGoods|5': [
            {
              id: '@integer(1,99999)',
              name: 'test',
              barcode: '@integer(100000000000000,999999999999999)',
              price: '@float(1,15,0,2)',
              num: '@integer(1,5)',
              amount: function () {
                return Number(this.price) * Number(this.num);
              },
            },
          ],
          'returnProgress|5': [
            {
              key: '@integer(1,99999)',
              time: '@datetime',
              rate: '@integer(1,9)',
              statuskey: '@boolean',
              status: function () {
                return this.statuskey ? 'success' : 'processing';
              },
              operator: 'ID @integer(1000,9999)',
              cost: '@integer(1,5) h',
            },
          ],
        }),
      };
    },
  },
] as MockMethod[];


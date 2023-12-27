import mockjs from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
const ajaxHeadersTokenKey = 'x-token';
export default [
  {
    url: '/api/user/login',
    method: 'POST',
    response: ({ body }) => {

      const { password, username } = body;
      const send = { code: 0, data: {}, msg: '' };
      if (username === 'admin' && password === '123456') {
          send['data'] = {
            role: 'admin',
            token: 'asdasd'
          };
      } else if (username === 'user' && password === '123456') {
          send['data'] = {
            role: 'user',
            token: 'asdasd'
          };
      } else if (username === 'test' && password === '123456') {
          send['data'] = {
            role: 'test',
            token: 'asdasd'
          };
      } else {
          send['code'] = 201;
          send['msg'] = 'Wrong username or password';
      }
      return send;
    },
  },
  {
    url: '/api/user/register',
    method: 'POST',
    response: ({ body }) => {
      return {
        code: 0,
        data: '',
        msg: '',
      };
    },
  },
  {
    url: '/api/user/message',
    method: 'GET',
    response: ({ body }) => {
      return {
        code: 0,
        data: mockjs.mock('@integer(0,99)'),
      };
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    // statusCode: 401,
    response: ({ headers, body }) => {
      if (headers['role'] === 'admin') {
        return {
          code: 0,
          data: {
            id: 1,
            name: 'Admins',
            avatar: '',
            roles: ['admin'],
          },
        };
      } else if (headers[ajaxHeadersTokenKey] === 'user') {
        return {
          code: 0,
          data: {
            id: 2,
            name: 'Users',
            avatar: '',
            roles: ['user'],
          },
        };
    } else if (headers[ajaxHeadersTokenKey] === 'test') {
      return {
          code: 0,
          data: {
            id: 3,
            name: 'Tests',
            avatar: '',
            roles: ['test'],
          },
        };
    } else {
        return {
          code: 10002,
          data: {},
          msg: 'Chưa đăng nhập',
        };
    }
    },
  },
] as MockMethod[];


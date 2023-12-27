import { MockMethod } from 'vite-plugin-mock';
const ajaxHeadersTokenKey = 'x-token';
export default [

  {
    url: '/api/uploads',
    method: 'POST',
    response: () => {
      return {
        code: 0,
        data: {
          id: 1,
          url:
          'http://iigVietNamDemo',
          name: 'xcx.jpg',
        },
      };
    },
  },

  {
    url: '/api/500',
    method: 'get',
    // statusCode: 401,
    response: ({ headers, body }) => {
      return {
        timestamp: 1513932555104,
        status: 500,
        error: 'error',
        message: 'error',
        path: '/500',
      }
    },
  },
] as MockMethod[];


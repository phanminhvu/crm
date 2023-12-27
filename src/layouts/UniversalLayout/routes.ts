import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';
import { NavigationModel } from '@/apis/models/NavigationModel';
import { ResponseData } from '@/apis';
import { getNavigation } from '@/apis/services/NavigationService';
import { convertRouter } from '@/utils/router';

const getNav = async (): Promise<IRouter[]> => {
  return [];
  const response: ResponseData<NavigationModel> = (await getNavigation()) as ResponseData<NavigationModel>;
  var lists: NavigationModel[] = response.data as NavigationModel[];
  // lists = lists.filter((item: NavigationModel) => {
  //   return item.url != null;
  // });
  lists.sort((a: NavigationModel, b: NavigationModel) => (a.order || 0) - (b.order || 0));
  return convertRouter(lists);
}; // tạm comment return để lấy list nav hardcode để chạy demo, khi nào cần dùng nav từ db thì bỏ comment và xóa list hardcode đi
const routerFromApi = await getNav();
const universalLayoutRotes: IRouter[] = [
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'Trang chủ',
    },
    redirect: '/home/workplace',
    children: [
      {
        path: 'workplace',
        meta: {
          icon: 'control',
          title: 'Tổng quan',
        },
        component: lazy(() => import('@/pages/Home')),
      }
    ],
  },

  {
    path: '/company-type',
    meta: {
      icon: 'control',
      title: 'Loại hình khách hàng',
    },
    component: lazy(() => import('@/pages/CompanyType')),
  },

  {
    path: '/company-group',
    meta: {
      icon: 'list',
      title: 'Nhóm khách hàng',
    },
    component: lazy(() => import('@/pages/CompanyGroup')),
  },

  {
    path: '/customer-list',
    meta: {
      icon: 'list',
      title: 'Khách hàng',
    },
    component: lazy(() => import('@/pages/CustomerList')),
  },

  {
    path: '/customer-list/:id',
    meta: {
      hidden: true,
    },
    component: lazy(() => import('@/pages/CustomerList/detail/basic')),
  },

  {
    path: '/customer-list/new',
    meta: {
      hidden: true,
    },
    component: lazy(() => import('@/pages/CustomerList/detail/basic')),
  },


  // {
  //   path: '/pages',
  //   redirect: '/pages/list/basic',
  //   meta: {
  //     icon: 'page',
  //     title: 'Mẫu trang',
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       redirect: '/pages/list/basic',
  //       meta: {
  //         icon: 'list',
  //         title: 'Danh sách',
  //       },
  //       children: [
  //         {
  //           path: 'table',
  //           meta: {
  //             title: 'Danh sách dạng bảng',
  //           },
  //           component: lazy(() => import('@/pages/pagesample/list/search/table')),
  //         }
  //       ],
  //     },
  //     {
  //       path: 'form',
  //       redirect: '/pages/form/basic',
  //       meta: {
  //         icon: 'edit',
  //         title: 'Form mẫu',
  //       },
  //       children: [
  //         {
  //           path: 'basic',
  //           meta: {
  //             title: 'Form cơ bản',
  //           },
  //           component: lazy(() => import('@/pages/pagesample/form/basic')),
  //         },
  //         {
  //           path: 'complex',
  //           meta: {
  //             title: 'Form nâng cao',
  //           },
  //           component: lazy(() => import('@/pages/pagesample/form/complex')),
  //         },
  //       ],
  //     },
  //     {
  //       path: 'detail',
  //       meta: {
  //         icon: 'detail',
  //         title: 'Trang chi tiết',
  //       },
  //       children: [
  //         {
  //           path: 'basic',
  //           meta: {
  //             title: 'Mẫu trang chi tiết',
  //             tabNavType: 'querypath',
  //           },
  //           component: lazy(() => import('@/pages/pagesample/detail/basic')),
  //         }
  //       ],
  //     },
  //   ],
  // },

];

export default universalLayoutRotes.concat(routerFromApi);

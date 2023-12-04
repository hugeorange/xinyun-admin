import { createRouter, createWebHashHistory } from 'vue-router'
import { Calendar, PieChart, Tickets, Document } from '@element-plus/icons-vue'

import Login from '@/pages/login/index.vue'
import User from '@/pages/user/index.vue'
import Customer from '@/pages/customer/index.vue'
import Room from '@/pages/room/index.vue'
import Letter from '@/pages/letter/index.vue'
import RoomPreview from '@/pages/roomPreview/index.vue'
import RoomBook from '@/pages/roomBook/index.vue'
import RoomOrder from '@/pages/roomOrder/index.vue'
import BillingList from '@/pages/billingList/index.vue'
import BookTable from '@/pages/bookTable/index.vue'
import WorkHoursTable from '@/pages/workHoursTable/index.vue'

export const routes = [
  { path: '/login', component: Login, meta: { name: 'login', full: true } },
  { path: '/', redirect: '/info/user' },
]

export const menus = [
  {
    name: '基础数据模块',
    path: '/info',
    icon: Document,
    children: [
      { name: '用户信息', path: 'user', component: User },
      { name: '客户信息', path: 'customer', component: User },
      { name: '机台信息', path: 'room', component: Room },
      { name: '告知书信息', path: 'letter', component: Letter },
    ],
  },
  {
    name: '预定模块',
    path: '/booking',
    icon: Calendar,
    children: [
      { name: '机台预览', path: 'preview', component: RoomPreview },
      { name: '机台预订', path: 'room', component: RoomBook },
    ],
  },
  {
    name: '机台工单',
    path: '/work-order',
    icon: Tickets,
    component: RoomOrder,
  },
  {
    name: '计费清单',
    path: '/bill-list',
    icon: Tickets,
    component: BillingList,
  },
  {
    name: '预订汇总表',
    path: '/book-table',
    icon: PieChart,
    component: BookTable,
  },
  {
    name: '实际机时表',
    path: '/works-table',
    icon: PieChart,
    component: WorkHoursTable,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...menus],
})

export default router

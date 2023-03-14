import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
    
      component: ()=> import('../views/home/Home.vue')
    },
    {
      path: '/home',
      component: ()=> import('../views/home/Home.vue')
    },
    {
      path: '/cart',
      component: ()=> import('../views/cart/Cart.vue')
    },
    {
      path: '/order',
      component: ()=> import('../views/order/Order.vue')
    },
    {
      path: '/mine',
      component: ()=> import('../views/mine/Mine.vue')
    },
    {
      path: '/position',
      component: ()=> import('../views/position/Position.vue')
    },
    {
      path: '/city/:cityid',
      component: ()=> import('../views/position/City.vue')
    },
    {
      path: '/mine/login',
      component: ()=> import('../views/login/Login.vue')
    },
    {
      path: '/mine/info',
      component: ()=> import('../views/mine/children/Info.vue')
    },
    {
      path: '/mine/info/setusername',
      component: ()=> import('../views/mine/children/children/SetUserName.vue')
    },
    {
      path: '/mine/info/address',
      component: ()=> import('../views/mine/children/children/Address.vue')
    },
    {
      path: '/mine/info/address/add',
      component: ()=> import('../views/mine/children/children/children/Add.vue')
    },
    {
      path: '/mine/info/address/add/addDetail',
      component: ()=> import('../views/mine/children/children/children/children/AddDetail.vue')
    },
    {
      path: '/forget',
      component: ()=> import('../views/forget/Forget.vue')
    },
    {
      path: '/food',
      component: ()=> import('../views/food/Food.vue')
    },
    {
      path: '/shop',
      component: ()=> import('../views/shop/Shop.vue')
    },
    {
      path: '/confirmOrder',
      component: ()=> import('../views/confirmOrder/confirmOrder.vue')
    },
    {
      path: '/confirmOrder/remark',
      component: ()=> import('../views/confirmOrder/children/Remark.vue')
    },
    {
      path: '/confirmOrder/invoice',
      component: ()=> import('../views/confirmOrder/children/Invoice.vue')
    },
    {
      path: '/confirmOrder/payment',
      component: ()=> import('../views/confirmOrder/children/Payment.vue')
    },
    {
      path: '/order/orderDetail',
      component: ()=> import('../views/order/children/OrderDetail.vue')
    },
    {
      path: '/benefit',
      component: ()=> import('../views/benefit/Benefit.vue')
    },
    {
      path: '/benefit/hbHistory',
      component: ()=> import('../views/benefit/children/HbHistory.vue')
    },
    {
      path: '/benefit/exchange',
      component: ()=> import('../views/benefit/children/Exchange.vue')
    },
    {
      path: '/benefit/commend',
      component: ()=> import('../views/benefit/children/Commend.vue')
    },
    {
      path: '/balance',
      component: ()=> import('../views/balance/Balance.vue')
    },
    {
      path: '/points',
      component: ()=> import('../views/points/Points.vue')
    },
    {
      path: '/vipcard',
      component: ()=> import('../views/vipcard/VipCard.vue')
    },
    {
      path: '/vipcard/useCart',
      component: ()=> import('../views/vipcard/children/UseCart.vue')
    },
    {
      path: '/vipcard/invoiceRecord',
      component: ()=> import('../views/vipcard/children/InvoiceRecord.vue')
    },
    {
      path: '/service',
      component: ()=> import('../views/service/Service.vue')
    },
    {
      path: '/service/questionDetail',
      component: ()=> import('../views/service/children/QuestionDetail.vue')
    },
    {
      path: '/service/online',
      component: ()=> import('../views/service/children/Online.vue')
    },
    {
      path: '/search',
      component: ()=> import('../views/search/Search.vue')
    }
  ]
})

export default router

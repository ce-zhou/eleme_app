const state = {
  cartList: [], // 加入购物车的商品列表
  remarkText: null,//可选备注内容
	inputText: '',//输入备注内容
  invoice: false,//开发票
  orderParam: null,//订单的参数
  orderMessage: null, //订单返回的信息
  shopId: null, //商铺id
  orderDetail: null, // 订单详情
  order: [], // 全部订单数据
};

const mutations = {
  addCart(state, obj) {
    if (state.cartList.length === 0) {
      state.cartList.push(obj);
    } else {
      state.cartList.forEach((item, index) => {
        if (item.item_id == obj.item_id) {
          obj.quantity++;
          obj.price = obj.price * obj.quantity;
          state.cartList.splice(index, 1, obj);
        }
      });
      if (obj.quantity == 1) {
        state.cartList.push(obj);
      }
    }
  },
  reduceCart(state) {
    state.cartList.splice(0, 4);
  },
  // 保存订单
  saveOrder(state, obj) {
    state.orderParam = obj
  },
  // 存储备注
  confirmRemark(state, obj) {
    state.remarkText = obj.remarkText
    state.inputText = obj.inputText
  },
  // 存储发票信息
  confirmInvoice(state, invoice) {
    state.invoice = invoice
  },
  // 下单成功， 订单返回的信息
  orderSuccess(state, orderRes) {
    state.orderMessage = orderRes
  },
  // 保存商铺id
  saveShopId(state, id) {
    state.shopId = id
  },
  // 清空购物车
  clearCart(state) {
    state.cartList = [];
  },
  //进入订单详情页前保存该订单信息
  saveOrderDetail(state, obj) {
    state.orderDetail = obj
  },
  // 保存全部订单数据
  saveAllOrder(state, arr) {
    state.order = arr
  }
};

export default {
  namespaced: true,
  state,
  mutations,
};

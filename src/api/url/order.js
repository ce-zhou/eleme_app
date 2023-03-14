import axios from "../http";

function checkOut(geohash, entities, shopid) {
  return axios.post("/api/v1/carts/checkout", {
    come_from: "web",
    geohash,
    entities,
    restaurant_id: shopid,
  });
}

// 获取快速备注列表
function getRemark(id, sig) {
  return axios.get("/api/v1/carts/" + id + "/remarks", {
    params: {
      sig,
    },
  });
}

// 发送订单信息
function placeOrders(
  user_id,
  cart_id,
  address_id,
  description,
  entities,
  geohash,
  sig
) {
  let data = {
    address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description,
    entities,
    geohash,
    paymethod_id: 1,
    sig,
  };
  return axios.post(`/api/v1/users/${user_id}/carts/${cart_id}/orders`, data);
}

// 重新发送订单验证码
function payRequest(merchantOrderNo, userId) {
  return axios.get("/api/payapi/payment/queryOrder", {
    params: {
      merchantId: 5,
      merchantOrderNo,
      source: "MOBILE_WAP",
      userId,
      version: "1.0.0",
    },
  });
}

// 获取订单列表
function getOrderList(user_id, offset) {
  return axios.get("/api/bos/v2/users/" + user_id + "/orders", {
    params: {
      limit: 10,
      offset,
    },
  });
}

export default {
  checkOut,
  getRemark,
  placeOrders,
  payRequest,
  getOrderList
};

import axios from "../http";

// 获取商铺信息
function shopList(
  latitude,
  longitude,
  restaurant_category_id,
  restaurant_category_ids,
  order_by = "",
  delivery_mode = "",
  support_ids = []
) {
  let supportStr = "";
  support_ids.forEach((item) => {
    if (item.status) {
      supportStr += "&support_ids[]=" + item.id;
    }
  });
  let params = {
    latitude,
    longitude,
    restaurant_category_id,
    "restaurant_category_ids[]": restaurant_category_ids,
    order_by,
    "delivery_mode[]": delivery_mode + supportStr,
  };
  return axios.get("/api/shopping/restaurants", { params });
}

// 获取所有商铺的分类列表
function foodCategory(latitude, longitude) {
  let params = {
    latitude,
    longitude,
  };
  return axios.get("/api/shopping/v2/restaurant/category", { params });
}

// 获取筛选的配送方式
function foodDelivery(latitude, longitude) {
  let params = {
    latitude,
    longitude,
  };
  return axios.get("/api/shopping/v1/restaurants/delivery_modes", { params });
}

// 获取商家属性活动列表
function foodActivity(latitude, longitude) {
  let params = {
    latitude,
    longitude,
  };
  return axios.get("/api/shopping/v1/restaurants/activity_attributes", {
    params,
  });
}

// 搜索商家
function searchRestaurant(geohash, keyword) {
  return axios.get("/api/v4/restaurants", {
    params: {
      geohash,
      keyword,
    },
  });
}

// 获取shop页面商铺详情
function shopDetails(shopid, latitude, longitude) {
  return axios.get("/api/shopping/restaurant/" + shopid, {
    params: {
      latitude,
      longitude,
    },
  });
}

// 商铺评论列表
function getRatingList(shopid, offset, tag_name = "") {
  return axios.get("/api/ugc/v2/restaurants/" + shopid + "/ratings", {
    params: {
      has_content: true,
      offset,
      limit: 10,
      tag_name,
    },
  });
}

// 获取商铺评价分数
function ratingScores(shopid) {
    return axios.get('/api/ugc/v2/restaurants/' + shopid + '/ratings/scores')
}

// 获取商铺评价分类
function ratingTags(shopid) {
    return axios.get('/api/ugc/v2/restaurants/' + shopid + '/ratings/tags')
}

export default {
  shopList,
  foodCategory,
  foodDelivery,
  foodActivity,
  searchRestaurant,
  shopDetails,
  getRatingList,
  ratingScores,
  ratingTags
};

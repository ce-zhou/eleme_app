import axios from "../http";

function cityGuess() {
  // 获取当前定位城市
  return axios.get("/api/v1/cities", {
    params: {
      type: "guess",
    },
  });
}

function hotCity() {
  // 获取热门城市
  return axios.get("/api/v1/cities", {
    params: {
      type: "hot",
    },
  });
}

function groupCity() {
  // 获取所有城市
  return axios.get("/api/v1/cities", {
    params: {
      type: "group",
    },
  });
}

// 获取搜索的地区
function searchPlace(id, searchValue) {
  return axios.get("/api/v1/pois", {
    params: {
      type: "search",
      city_id: id,
      keyword: searchValue,
    },
  });
}

// 获取所在城市
function currentCity(id) {
  return axios.get(`/api/v1/cities/${id}`);
}

// 根据经纬度获取详细定位
function posDetail(geohash) {
  return axios.get(`/api/v2/pois/${geohash}`);
}

// 获取用户地址
function getAddress(id) {
  return axios.get(`/api/v1/users/${id}/addresses`);
}

// 搜索地址
function searchAddress(keyword) {
  return axios.get("/api/v1/pois", {
    params: {
      type: "nearby",
      keyword,
    },
  });
}
// 添加地址
function postAddAddress(
  id,
  address,
  address_detail,
  geohash,
  name,
  phone,
  phone_bk,
  poi_type,
  sex,
  tag,
  tag_type
) {
  return axios.post(`/api/v1/users/${id}/addresses`, {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type,
  });
}

// 删除地址
function deleteAddress(user_id, address_id) {
  return axios.delete(`/api/v1/users/${user_id}/addresses/${address_id}`)
}

export default {
  cityGuess,
  hotCity,
  groupCity,
  searchPlace,
  currentCity,
  posDetail,
  getAddress,
  searchAddress,
  postAddAddress,
  deleteAddress
};

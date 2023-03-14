const state = {
    geohash: '',//地址geohash值
    latitude: '', // 经度
    longitude: '',// 纬度
    address: '', // 搜索的地址
    addNewAddress: [], // 新增地址
}
const actions = {

}
const mutations = {
    // 保存地区的geohash值
    saveGeohash(state, geohash) {
        state.geohash = geohash
    },
    // 保存详细地址的经纬度
    saveAddress(state, res) {
        state.latitude = res.latitude
        state.longitude = res.longitude
    },
    // 保存用户搜索的地址
    addAddress(state, address) {
        state.address = address
    },
    // 新增地址页面的信息
    addAllAddress(state, obj) {
        state.addNewAddress.unshift(obj)
    },
    deleteAddress(state, index) {
        state.addNewAddress.splice(index, 1)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
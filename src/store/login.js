const state = {
    // 用户信息
    userInfo: null,
}

const mutations = {
    // 保存用户信息
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    // 修改用户名
    resetUserName(state, username) {
        state.userInfo = Object.assign({}, state.userInfo,{username})
    },
    // 删除用户id
    deleteUserId(state) {
        delete state.userInfo.user_id
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
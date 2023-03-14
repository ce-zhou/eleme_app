const state = {
    question: null, // 问题详情
}

const mutations = {
    // 保存问题详情
    saveQuestion(state, obj) {
        state.question = obj;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
const state = {
  isLoading: true,
};

const mutations = {
  changeisLoading(state, data) {
    state.isLoading = data;
  },
};

export default {
    namespaced: true,
    state,
    mutations
}

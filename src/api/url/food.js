import axios from '../http'

function getFoodCate() {
    return axios.get('/api/v2/index_entry')
}

// 获取商铺食品列表
function getFoodMenu(id) {
    return axios.get('/api/shopping/v2/menu', {
        params: {
            restaurant_id: id
        }
    })
}

export default {
    getFoodCate,
    getFoodMenu
}
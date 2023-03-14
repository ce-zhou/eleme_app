import axios from '../http'

// 获取服务信息
function getService() {
    return axios.get('/api/v3/profile/explain')
}

export default {
    getService,
}
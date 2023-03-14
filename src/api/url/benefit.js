import axios from '../http'

// 获取红包数量
function getHongbaoNum(id) {
    return axios.get('/api/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0')
}

// 获取历史红包
function getHistoryHb(id) {
    return axios.get(`/api/promotion/v2/users/${id}/expired_hongbaos?limit=20&offset=0`)
}

// 兑换红包
function exChangeHongbao(id, exchange_code, captcha_code) {
    return axios.post(`/api/v1/users/${id}/hongbao/exchange`, {
        exchange_code,
        captcha_code
    })
}

export default {
    getHongbaoNum,
    getHistoryHb,
    exChangeHongbao
}
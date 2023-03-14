import axios from '../http'

// 获取图片验证码
function getCaptchas() {
    return axios.post('/api/v1/captchas')
}

// 账号密码登录
function accountLogin(username, password, codeNumber) {
    return axios.post('/api/v2/login', {
        username,
        password,
        captcha_code: codeNumber
    })
}

// 上传头像
function uploadAvatar(id, data) {
    return axios.post(`/api/v1/addimg/avatar`, {
        file: data
    })
}

// 退出登录
function signOut() {
    return axios.get('/api/v2/signout')
}

export default {
    getCaptchas,
    accountLogin,
    signOut,
    uploadAvatar
}
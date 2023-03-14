import axios from '../http'

function vipCart(id, number, password) {
    return axios.post('/api/member/v1/users/' + id + '/delivery_card/physical_card/bind', {
        number,
        password
    })
}

export default {
    vipCart,
}
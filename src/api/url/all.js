import axios from '../http'

function all(requestList, callback) {
    return axios.all(requestList).then(axios.spread((...params)=> {
        callback(...params)
    }))
}

export default {
    all,
}
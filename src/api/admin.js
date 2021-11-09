import { axios } from '@/utils/request'
const api = {
    adminPre: '/api/admin'
}
export function getManagerListAPI(){
    return axios({
        url: `${api.adminPre}/getAllManagers`,
        method: 'POST'
    })
}
export function addManagerAPI(data) {
    return axios({
        url: `${api.adminPre}/addManager`,
        method: 'POST',
        data
    })
}
export function delAccountAPI(data){
    return axios({
        url: `${api.adminPre}/delAccount`,
        method: 'POST',
        data
    })
}
export function changeUserAPI(data){
    return axios({
    url: `${api.adminPre}/changeUser`,
    method: 'POST',
    data
})
}
export function addHotelManagerAPI(data){
    return axios({
        url: `${api.adminPre}/addHotelManager`,
        method: 'POST',
        data
    })
}
export function searchHotelAPI(data){
    return axios({
        url: `${api.adminPre}/searchHotel`,
        method: 'POST',
        data
    })
}
export function changeHotelManagerAPI(data){
    return axios({
        url: `${api.adminPre}/changeHotelManager`,
        method: 'POST',
        data
    })
}


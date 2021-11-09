import { axios } from '@/utils/request'
const api = {
    hotelPre: '/api/hotel'
}
export function addRoomAPI(data) {
    return axios({
        url: `${api.hotelPre}/roomInfo`,
        method: 'POST',
        data,
    })
}
export function addHotelAPI(data) {
    return axios({
        url: `${api.hotelPre}/addHotel`,
        method: 'POST',
        data,
    })
}
export function mgrHotelListAPI(id) {
    return axios({
        url: `${api.hotelPre}/${id}/hotelMgr`,
        method: 'GET',
    })
}
export function submitManageHotelParamsAPI(data){
    return axios({
        url: `${api.hotelPre}/${data.id}/hotelInfo/update`,
        method: 'POST',
        data,
    })
}

export function submitManagePriceParamsAPI(data){
    return axios({
        url: `${api.hotelPre}/${data.id}/hotelInfo/updatePrice`,
        method: 'POST',
        data,
    })
}

export function submitManageNumParamsAPI(data){
    return axios({
        url: `${api.hotelPre}/${data.id}/hotelInfo/updateNum`,
        method: 'POST',
        data,
    })
}



export function deleteHotelAPI(data){
    return axios({
        url: `${api.hotelPre}/deleteHotel`,
        method: 'POST',
        data,
    })
}

import { axios } from '@/utils/request'
const api = {
    orderPre: '/api/order'
}
export function reserveHotelAPI(data) {
    return axios({
        url: `${api.orderPre}/addOrder`,
        method: 'POST',
        data,
    })
}
export function getAllOrdersAPI() {
    return axios({
        url: `${api.orderPre}/getAllOrders`,
        method: 'GET',
    })
}
export function getUserOrdersAPI(data) {
    return axios({
        url: `${api.orderPre}/${data.userId}/getUserOrders`,
        method: 'GET',
    })
}
export function cancelOrderAPI(orderId) {
    return axios({
        url: `${api.orderPre}/${orderId}/annulOrder`,
        method: 'GET',
    })
}
export function deleteOrderAPI(id) {
    return axios({
        url: `${api.orderPre}/${id}/deleteOrder`,
        method: 'POST',
    })
}
export function checkInAPI(id) {
    return axios({
        url: `${api.orderPre}/${id}/checkin`,
        method: 'GET',
    })
}
export function checkOutAPI(id) {
    return axios({
        url: `${api.orderPre}/${id}/checkout`,
        method: 'GET',
    })
}

export function abnormalOrdersOfTheDayAPI(hotelId) {
    console.log('33')

    return axios({
        url: `${api.orderPre}/abnormalOrdersOfTheDay`,
        method: 'GET',
        params: {hotelId: hotelId},
    })
}

export function managedHotelOrdersAPI(hotelId) {
    return axios({
        url: `${api.orderPre}/managedOrders`,
        method: 'GET',
        params: {hotelId: hotelId},
    })
}

export function submitCheckOutDateParamsAPI(data){
    return axios({
        url: `${api.orderPre}/${data.id}/orderInfo/updateCheckout`,
        method: 'POST',
        data,
    })
}
import { message } from 'ant-design-vue'
import store from '@/store'
import {
    getHotelsAPI,
    getHotelByIdAPI,
    searchHotelsAPI,
    filterHotelsAPI,
    priceSortAPI,
    rateSortAPI
} from '@/api/hotel'
import {
    reserveHotelAPI
} from '@/api/order'
import {
    orderMatchCouponsAPI,
} from '@/api/coupon'

const hotel = {
    state: {
        hotelList: [
            
        ],
        rankAll:true,
        typeAll:true,
        hotelListParams: {
            pageNo: 0,
            pageSize: 12
        },
        hotelListLoading: true,
        currentHotelId: '',
        currentHotelInfo: {

        },
        orderModalVisible: false,
        currentOrderRoom: {

        },
        addRegion:{
            address:'南京',
            bizRegion:'XiDan'
        },
        bizRegion:'XiDan',
        orderMatchCouponList: [

        ]
    },
    mutations: {
        set_hotelList: function(state, data) {
            state.hotelList = data
        },
        set_addRegion: function(state, data){
            state.addRegion = data
        },
        set_rankAll: function(state, data) {
            state.rankAll = data
        },
        set_typeAll: function(state, data) {
            state.typeAll= data
        },
        set_hotelListParams: function(state, data) {
            state.hotelListParams = {
                ...state.hotelListParams,
                ...data,
            }
        },
        set_hotelListLoading: function(state, data) {
            state.hotelListLoading = data
        },
        set_currentHotelId: function(state, data) {
            state.currentHotelId = data
        },
        set_currentHotelInfo: function(state, data) {
            state.currentHotelInfo = {
                ...state.currentHotelInfo,
                ...data,
            }
        },
        set_orderModalVisible: function(state, data) {
            state.orderModalVisible = data
        },
        set_currentOrderRoom: function(state, data) {
            state.currentOrderRoom = {
                ...state.currentOrderRoom,
                ...data,
            }
        },
        set_orderMatchCouponList: function(state, data) {
            state.orderMatchCouponList = data
        }
    },

    actions: {
        getHotelList: async({commit, state}) => {
            const res = await getHotelsAPI()
            if(res){
                commit('set_hotelList', res)
                commit('set_hotelListLoading', false)
            }
        },
        filterHotelList:async({commit, state,dispatch},data) => {

            const res = await searchHotelsAPI(state.addRegion)
            if(res){
                dispatch('filterHotelList2',data)
                commit('set_hotelListLoading', false)
            }

        },
        filterHotelList2:async({commit, state},data) => {

            const res = await filterHotelsAPI(data)
            if(res){
                commit('set_hotelList',res)
            }

        },
        priceSort:async({commit, state},data) => {

            const res = await priceSortAPI()
            if(res){
                commit('set_hotelList', res)
                commit('set_hotelListLoading', false)
            }

        },
        rateSort:async({commit, state},data) => {

            const res = await rateSortAPI()
            if(res){
                commit('set_hotelList', res)
                commit('set_hotelListLoading', false)
            }

        },
        addRegionFilter:async({commit, state}) => {
            console.log("data",state.addRegion)
            const res = await searchHotelsAPI(state.addRegion)
            if(res){
                commit('set_hotelList', res)
                commit('set_hotelListLoading', false)
            }

        },

        getHotelById: async({commit, state}) => {
            const res = await getHotelByIdAPI({
                hotelId: state.currentHotelId
            })
            if(res){
                commit('set_currentHotelInfo', res)
            }
        },
        addOrder: async({ state, commit }, data) => {
            const res = await reserveHotelAPI(data)
            console.log(res)
            if(res){
                message.success('预定成功')
                commit('set_orderModalVisible', false)
            }
        },
        getOrderMatchCoupons: async({ state, commit }, data) => {
            const res = await orderMatchCouponsAPI(data)
            if(res){
                commit('set_orderMatchCouponList', res)
            }
        }
    }
}

export default hotel
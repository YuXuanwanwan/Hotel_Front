import { message } from 'ant-design-vue'
import {
    hotelAllCouponsAPI,
    hotelFestivalAPI,
    hotelMultiplyRoomsAPI
} from "@/api/coupon"

const marketer = {
    state:{
        marketerHotelId:-1,
        marketerCouponList:[],
        addWebStrategyModalVisible:false
    },
    mutations: {
        set_marketerCouponList: function(state, data) {
            state.marketerCouponList = data
        },
        set_addWebStrategyModalVisible: function(state, data) {
            state.addWebStrategyModalVisible = data
        }
    },
    actions: {
        getMarketerCoupon: async({ state, commit }) => {
            const res = await hotelAllCouponsAPI(state.marketerHotelId)
            if(res) {
                commit('set_marketerCouponList',res)
            }
        },
        addWebTimeCoupon:async ({ commit, dispatch }, data)=>{
            const res = await hotelFestivalAPI(data);
            if(res) {
                commit('set_addWebStrategyModalVisible', false)
                message.success('添加成功')
                dispatch('getMarketerCoupon')
            }else{
                message.error('添加失败')
            }
        },
        addWebMultiplyRoomsCoupon: async({ commit, dispatch }, data) => {
            console.log("hahaha")
            const res = await hotelMultiplyRoomsAPI(data)
            console.log("lalala")
            if(res){
                commit('set_addWebStrategyModalVisible',false)
                message.success('添加成功')
                dispatch('getMarketerCoupon')
            }else{
                message.error('添加失败')
            }
        },
    }
}

export default marketer
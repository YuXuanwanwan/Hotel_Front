import {
    addRoomAPI,
    addHotelAPI,
    mgrHotelListAPI,
    submitManageHotelParamsAPI,
    submitManagePriceParamsAPI,
    submitManageNumParamsAPI,

} from '@/api/hotelManager'
import {
    managedOrdersAPI,
    hotelAllRoomAPI,
    deleteRoomAPI,
} from '@/api/hotel'
import {
    getAllOrdersAPI,
    deleteOrderAPI,
    checkInAPI,
    checkOutAPI,
    abnormalOrdersOfTheDayAPI,
    managedHotelOrdersAPI,
    submitCheckOutDateParamsAPI,


} from '@/api/order'
import {
    hotelAllCouponsAPI,
    hotelTargetMoneyAPI,
    hotelFestivalAPI,
} from '@/api/coupon'
import {message} from 'ant-design-vue'

const hotelManager = {
    state: {
        unusualOrderList: [],
        managedOrders: [],
        mgrHotelList: [],
        orderList: [],
        addHotelModalVisible: false,
        manageRoomVisible: true,
        addRoomParams: {
            roomType: '',
            hotelId: '',
            price: '',
            total: 0,
            curNum: 0,
        },
        addRoomModalVisible: false,
        couponVisible: false,
        addCouponVisible: false,
        unusualOrderVisible: false,
        manageHotelVisible: false,
        orderVisible: false,
        roomVisible: false,
        activeHotelId: 0,
        activeRoomId: 0,
        couponList: [],
        mgrOrderList: [],
        roomList: [],
        managePriceVisible: false,
        manageNumVisible: false,
        checkOutDateVisible: false,

    },
    mutations: {
        // set_managedOrders: function(state, data) {
        //     state.managedOrders = data
        // },
        set_orderList: function (state, data) {
            state.orderList = data
        },
        set_mgrHotelList: function (state, data) {
            state.mgrHotelList = data
        },
        set_addHotelModalVisible: function (state, data) {
            state.addHotelModalVisible = data
            console.log("Visible")
        },
        // set_manageRoomVisible: function(state, data) {
        //     state.manageRoomVisible = data
        // },
        set_unusualOrderVisible: function (state, data) {
            state.unusualOrderVisible = data
        },
        set_orderVisible: function (state, data) {
            console.log('ordervisible')
            state.orderVisible = data
        },
        set_manageHotelVisible: function (state, data) {
            state.manageHotelVisible = data
        },
        // set_addHotelParams: function(state, data) {
        //     state.addHotelParams = {
        //         ...state.addHotelParams,
        //         ...data,
        //     }
        // },
        set_addRoomModalVisible: function (state, data) {
            console.log(state.addRoomModalVisible)
            state.addRoomModalVisible = data
            console.log(state.addRoomModalVisible)
        },
        set_addRoomParams: function (state, data) {
            state.addRoomParams = {
                ...state.addRoomParams,
                ...data,
            }
        },
        set_couponVisible: function (state, data) {
            state.couponVisible = data
        },
        set_roomVisible: function (state, data) {
            state.roomVisible = data
        },
        set_activeHotelId: function (state, data) {
            state.activeHotelId = data
        },
        set_activeRoomId: function (state, data) {
            console.log(data)
            state.activeRoomId = data
            console.log(state.activeRoomId)
        },
        set_couponList: function (state, data) {
            state.couponList = data
        },
        set_addCouponVisible: function (state, data) {
            state.addCouponVisible = data
        },
        set_unusualOrderList: (state, data) => {
            state.unusualOrderList = data
            console.log(state.unusualOrderList)
        },

        set_managedHotelOrders: function (state, data) {
            state.mgrOrderList = data
        },
        set_roomList: function (state, data) {
            state.roomList = data
        },

        set_managePriceVisible: function (state, data) {
            console.log('454454')
            state.managePriceVisible = data
            console.log(state.managePriceVisible)
        },
        set_manageNumVisible: function (state, data) {
            console.log('454454')
            state.manageNumVisible = data
            console.log(state.manageNumVisible)
        },
        set_checkOutDateVisible: function (state, data) {
            console.log('454454')
            state.checkOutDateVisible = data
            console.log(state.checkOutDateVisible)
        },
    },
    actions: {
        getAllOrders: async ({state, commit}) => {
            const res = await getAllOrdersAPI()
            if (res) {
                commit('set_orderList', res)
            }
        },

        getUnusualOrderList: async ({state, commit}, id) => {
            console.log(id)
            const res = await abnormalOrdersOfTheDayAPI(id)
            if (res) {
                commit('set_unusualOrderList', res)
            }
        },
        addHotel: async ({state, commit, dispatch}, data) => {
            const res = await addHotelAPI(data)
            if (res) {
                dispatch('getHotelList')

                commit('set_addHotelModalVisible', false)
                message.success('????????????')
            } else {
                message.error('????????????')
            }
        },
        addRoom: async ({state, dispatch, commit}) => {
            const res = await addRoomAPI(state.addRoomParams)
            console.log(state.addRoomParams.roomType)
            if (!res) {
                commit('set_addRoomModalVisible', false)
                commit('set_addRoomParams', {
                    roomType: '',
                    hotelId: '',
                    price: '',
                    total: 0,
                    curNum: 0,
                })
                message.success('????????????');
            } else {
                message.error('????????????');
            }
        },
        getHotelCoupon: async ({state, commit}) => {
            const res = await hotelAllCouponsAPI(state.activeHotelId)
            if (res) {
                // ?????????????????????????????????????????????????????????????????????couponList???
                commit('set_couponList', res)
            }
        },
        getHotelRoom: async ({state, commit}) => {
            console.log(state.activeHotelId)
            console.log('fff')

            const res = await hotelAllRoomAPI(state.activeHotelId)
            console.log(state.activeHotelId)
            console.log('sss')

            if (res) {
                // ?????????????????????????????????????????????????????????????????????couponList???
                commit('set_roomList', res)
            }
        },
        addHotelCoupon: async ({commit, dispatch}, data) => {

            const res = await hotelTargetMoneyAPI(data)

            if (res) {
                // ??????????????????????????????????????????modal???????????????????????????????????????????????????
                dispatch('getHotelCoupon');
                commit('set_addCouponVisible', false);
                commit('set_couponVisible', true);
                message.success('?????????????????????');
            } else {
                // ????????????????????????
                commit('set_addCouponVisible', false);
                commit('set_couponVisible', true);
                message.error('????????????');
            }
        },
        deleteOrder: async ({state, dispatch}, id) => {
            //console.log(id)
            const res = await deleteOrderAPI(id)
            if (res) {
                message.success('????????????')
                dispatch('getAllOrders')
            }
        },
        deleteRoom: async ({state, dispatch}, id) => {
            //console.log(id)
            const res = await deleteRoomAPI(id)
            if (res) {
                message.success('????????????')
                dispatch('getHotelRoom')
            }
        },
        getMgrHotelList: async ({state, commit}, id) => {
            console.log(id)
            const res = await mgrHotelListAPI(id)
            if (res) {
                commit('set_mgrHotelList', res)
            }
        },
        //??????
        getManagedOrders: async ({state, commit}) => {
            console.log(state.activeHotelId)
            const res = await managedHotelOrdersAPI(state.activeHotelId)
            if (res) {
                commit('set_managedHotelOrders', res)
            }
        },
        checkIn: async ({state, dispatch}, id) => {
            const res = await checkInAPI(id)
            if (res) {
                message.success('????????????')
                dispatch('getManageOrders')
            }
        },
        //????????????????????????
        submitManageHotelParams: async ({commit, dispatch}, data) => {

            const res = await submitManageHotelParamsAPI(data)
            if (res) {
                dispatch('getMgrHotelList')
                console.log('??????????????????')
                commit('set_manageHotelVisible', false);
                message.success('????????????')
            } else {
                message.error('????????????');
            }
        },
        submitManagePriceParams: async ({commit, dispatch}, data) => {
            console.log('??????hhh')
            const res = await submitManagePriceParamsAPI(data)
            console.log('??????hhh')
            if (res) {
                console.log('??????????????????')
                commit('set_managePriceVisible', false);
                message.success('????????????')
            } else {
                message.error('????????????');
            }
        },
        submitCheckOutDateParams: async ({commit, dispatch}, data) => {
            console.log('??????hhh')
            const res = await submitCheckOutDateParamsAPI(data)
            console.log('??????hhh')
            if (res) {
                console.log('??????????????????')
                commit('set_checkOutDateVisible', false);
                message.success('????????????')
            } else {
                message.error('????????????');
            }
        },
        submitManageNumParams: async ({commit, dispatch}, data) => {
            console.log('??????hhh')
            const res = await submitManageNumParamsAPI(data)
            console.log('??????hhh')
            if (res) {
                console.log('??????????????????')
                commit('set_manageNumVisible', false);
                message.success('????????????')
            } else {
                message.error('????????????');
            }
        },
        checkOut: async ({state, dispatch}, id) => {
            const res = await checkOutAPI(id)
            if (res) {
                message.success('????????????')
                dispatch('getManageOrders')
            }
        }
    }
}
export default hotelManager

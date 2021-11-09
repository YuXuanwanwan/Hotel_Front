<template>
    <div class="manageHotel-wrapper" >
<!--        {{mgrHotelList}}-->
        <a-tabs >
            <a-tab-pane tab="酒店管理" key="1">
                <transition name="fade-transform" mode="out-in">

                <a-table
                        :columns="columns1"
                        :dataSource="mgrHotelList"
                        bordered
                >
                    <span slot="bizRegion" slot-scope="text">
                        <span v-if="text == '新街口'">新街口</span>
                        <span v-if="text == '仙林中心'">仙林中心</span>
                        <span v-if="text == '老门东'">老门东</span>
                        <span v-if="text == '浦东机场'">浦东机场</span>
                        <span v-if="text == '东方之门'">东方之门</span>
                    </span>
                    <span slot="hotelStar" slot-scope="text">
                        <span v-if="text == 'One'">一星级</span>
                        <span v-if="text == 'Two'">二星级</span>
                        <span v-if="text == 'Three'">三星级</span>
                        <span v-if="text == 'Four'">四星级</span>
                        <span v-if="text == 'Five'">五星级</span>
                    </span>
                    <span slot="action" slot-scope="record">


                        <a-row class="row" type="flex">
                            <a-button type="primary" size="small" @click="manageRoom(record)">房间管理</a-button>
                            <a-divider type="vertical"></a-divider>

                            <a-button type="info" size="small" @click="manageOrder(record.id)">入住办理</a-button>
                            <a-divider type="vertical"></a-divider>

                            <a-button type="danger" size="small" @click="showDrawer(record.id)">异常订单</a-button>
                            <a-divider type="vertical"></a-divider>
                        </a-row>

                        <a-row class="row" type="flex">

                            <a-button type="primary" size="small" @click="showCoupon(record)">优惠策略</a-button>
                            <a-divider type="vertical"></a-divider>


                            <a-button type="info" size="small" @click="manageHotel(record)">维护信息</a-button>
                            <a-divider type="vertical"></a-divider>
                            <a-button type="danger" size="small"  @click="delete_Hotel(record)">删除酒店</a-button>
                        </a-row>
                    </span>
                </a-table>
                </transition>

            </a-tab-pane>
        </a-tabs>
        <AddHotelModal></AddHotelModal>
        <Coupon></Coupon>
        <roomModal></roomModal>
        <manageOrder :hotelId="id"></manageOrder>
        <unusualOrder :hotelId="id" ></unusualOrder>
        <ManageHotelModal :record="clickedRecord"></ManageHotelModal>
    </div>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    //import AddHotelModal from './components/addHotelModal'
    import Coupon from './components/coupon'
    import unusualOrder from "./components/unusualOrder";
    import ManageHotelModal from "./components/manageHotelModal";
    import manageOrder from "./components/manageOrder";
    import roomModal from "./components/roomModal";
    import {deleteHotelAPI} from '@/api/hotelManager';
    import {message} from "ant-design-vue";
    const moment = require('moment')
    const columns1 = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '酒店名',
            dataIndex: 'name',
        },
        {
            title: '商圈',
            dataIndex: 'bizRegion',
            scopedSlots: {customRender: 'bizRegion'}

        },
        {
            title: '地址',
            dataIndex: 'description',
        },
        {
            title: '星级',
            dataIndex: 'hotelStar',
            scopedSlots: {customRender: 'hotelStar'}

        },
        {
            title: '评分',
            dataIndex: 'rate',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },
    ];
    export default {
        name: 'manageHotel',
        data() {
            return {
                id:'',
                formLayout: 'horizontal',
                pagination: {},
                columns1,
                visible: false,
                form: this.$form.createForm(this, {name: 'manageHotel'}),
                clickedRecord:{}
            }
        },
        components: {
            //AddHotelModal,
            Coupon,
            unusualOrder,
            ManageHotelModal,
            manageOrder,
            roomModal,
        },
        computed: {
            ...mapGetters([
                'userId',
                'orderList',
                'unusualOrderList',
                'managedOrders',
                'mgrHotelList',
                'addHotelModalVisible',
                'addRoomModalVisible',
                'activeHotelId',
                'couponVisible',
                'unusualOrderVisible',
                'currentHotelInfo',
                'orderVisible',
                'roomVisible',
            ]),
        },
        async mounted() {
            await this.getMgrHotelList(this.userId)
            await this.getHotelById()
        },
        methods: {
            ...mapMutations([
                'set_addHotelModalVisible',
                'set_addRoomModalVisible',
                'set_couponVisible',
                'set_activeHotelId',
                'set_unusualOrderVisible',
                'set_manageHotelVisible',
                'set_orderVisible',
                'set_roomVisible',
            ]),
            ...mapActions([
                'getMgrHotelList',
                'getAllOrders',
                'getHotelCoupon',
                'deleteOrder',
                'getManagedOrders',
                'getHotelById',
                'checkIn',
                'checkOut',
                'getUnusualOrderList',
                'getHotelRoom',
            ]),
            showDrawer(id) {
                this.getUnusualOrderList(id)
                this.set_unusualOrderVisible(true);
            },
            checkin(id){
                this.checkIn(id)
            },
            checkout(id){
                this.checkOut(id)
            },
            addHotel() {
                this.set_addHotelModalVisible(true)
            },
            manageRoom(record) {
                this.set_activeHotelId(record.id)
                console.log('fir suc')
                this.set_roomVisible(true)
                console.log('sec suc')
                this.getHotelRoom()
            },
            showCoupon(record) {
                this.set_activeHotelId(record.id)
                this.set_couponVisible(true)
                this.getHotelCoupon()
            },
            manageHotel(record) {
                this.clickedRecord=record;
                // console.log(record)
                this.set_activeHotelId(record.id)
                this.set_manageHotelVisible(true)
            },

            manageOrder(id) {
                this.set_activeHotelId(id)
                this.set_orderVisible(true)
                this.getManagedOrders()
            },
            delete_Hotel(record){
                console.log(record)
                deleteHotelAPI({id:record.id}).then(res => {
                    this.getMgrHotelList(this.userId)
                    message.success('删除成功')
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .manageHotel-wrapper {
        padding: 50px;

        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
    .row {
        height: 28px;
    }
</style>
<style lang="less">
    .manageHotel-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style>
</style>

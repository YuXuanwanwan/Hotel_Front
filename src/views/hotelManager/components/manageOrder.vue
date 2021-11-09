<template>
    <div>
        <a-drawer
                title="订单详情"
                height="400"
                @close="onClose"
                placement="top"
                :closable="false"
                :visible="orderVisible"
        >
            <a-table
                    :columns="columns"
                    size="small"
                    :dataSource="mgrOrderList"
                    bordered
            >
            <span slot="child" slot-scope="record">
                                    <a-button type="info" size="small"
                                              v-if="!record.haveChild">无</a-button>
                <a-button type="info" size="small"
                          v-if="record.haveChild">有</a-button></span>


                <span slot="action" slot-scope="record">

                    <a-button type="primary" size="small" @click="checkRoomIn(record)"
                              v-if="record.orderState == '已预订'">入住</a-button>
                    <a-button type="primary" size="small" @click="checkRoomIn(record)"
                              v-if="record.orderState == '异常恢复'">入住</a-button>

                    <a-popconfirm
                            title="确定退房吗？"
                            @confirm="checkout(record.id)"
                            okText="确定"
                            cancelText="取消"
                    >
                        <a-button type="primary" size="small" v-if="record.orderState == '已入住'">退房</a-button>
                    </a-popconfirm>


                    </span>
            </a-table>
        </a-drawer>

        <checkOutDate :record="clickedRecord"></checkOutDate>
    </div>

</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import checkOutDate from "./checkOutDate";
    import {mgrHotelListAPI} from "../../../api/hotelManager";

    const columns = [
        // 这里定义列表头
        {
            title: '用户Id',
            dataIndex: 'userId',
            scopedSlots: {customRender: 'userId'}
        },
        {
            title: '酒店Id',
            dataIndex: 'hotelId',
        },
        {
            title: '入住时间',
            dataIndex: 'checkInDate',
        },
        {
            title: '退房时间 ',
            dataIndex: 'checkOutDate',
        },
        {
            title: '房间类型',
            dataIndex: 'roomType',
        },
        {
            title: '房间数量',
            dataIndex: 'roomNum',
        },
        {
            title: '开始时间',
            dataIndex: 'peopleNum',
        },
        {
            title: '有无儿童',
            key: 'child',
            scopedSlots: {customRender: 'child'},

        },
        {
            title: '创建时间',
            dataIndex: 'createDate',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '客户姓名',
            dataIndex: 'clientName',
        },
        {
            title: '电话号码',
            dataIndex: 'phoneNumber',
        },
        {
            title: '订单状态',
            filters: [{text: '已预订', value: '已预订'}, {text: '已撤销', value: '已撤销'},
                {text: '已入住', value: '已入住'}, {text: '已退房', value: '已退房'},],
            onFilter: (value, record) => record.orderState.includes(value),
            dataIndex: 'orderState',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },
    ];
    export default {
        name: 'manageOrder',
        props: [
            'hotelId',
        ],
        data() {
            return {
                columns,
                clickedRecord: {}
            }
        },
        components: {
            checkOutDate,
        },
        computed: {
            ...mapGetters([
                'orderVisible',
                'mgrOrderList',
            ])
        },
        methods: {
            ...mapMutations([
                'set_orderVisible',
                'set_checkOutDateVisible',
            ]),
            ...mapActions([
                'getManagedOrders',
                'checkIn',
                'checkOut',
            ]),
            onClose() {
                console.log('cancel'),
                    this.set_orderVisible(false)
            },

            checkin(id) {
                this.checkIn(id)
            },
            checkout(id) {
                this.checkOut(id)
            },
            checkRoomIn(record) {// 改变状态，自动渲染
                this.clickedRecord = record;
                this.set_checkOutDateVisible(true)
                console.log('23')
                this.set_orderVisible(false)

            },
        },
    }
</script>
<style scoped>

</style>
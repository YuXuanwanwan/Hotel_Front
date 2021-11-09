<template>
    <div>
        <a-drawer
                title="当日异常订单"
                placement="top"
                :closable="false"
                height="400"
                :visible="unusualOrderVisible"
                @close="onClose"
        >
            <a-table
                    size="small"
                    :columns="columns1"
                    :dataSource="unusualOrderList"
                    bordered
            >
                            <span slot="child" slot-scope="record">
                                    <a-button type="info" size="small"
                                              v-if="!record.haveChild">无</a-button>
                <a-button type="info" size="small"
                          v-if="record.haveChild">有</a-button></span>
                <span slot="action" slot-scope="record">
                    <a-popconfirm
                            title="确定恢复入住吗？"
                            @confirm="checkin(record.id)"
                            okText="确定"
                            cancelText="取消"
                    >
                        <a-button type="primary" size="small">恢复入住</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-drawer>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    const columns1 = [
        {
            title: '用户Id',
            dataIndex: 'userId',
            scopedSlots: {customRender: 'userId'}
        },
        {
            title: '酒店Id',
            dataIndex: 'hotelId',
            //scopedSlots: {customRender: 'userId'}
        },
        {
            title: '入住时间',
            dataIndex: 'checkInDate',
            //scopedSlots: {customRender: 'checkInDate'}
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
        name: "unusualOrder",
        props: [
            'hotelId',
        ],
        data() {
            return {
                columns1
            }
        },
        computed: {
            ...mapGetters([
                'unusualOrderVisible',
                'unusualOrderList'
            ])
        },
        async mounted() {
            // await this.getUnusualOrderList(this.hotelId)
        },
        methods: {
            ...mapActions([
                'getUnusualOrderList',
                'checkIn'
            ]),
            ...mapMutations([
                'set_unusualOrderVisible',
            ]),
            onClose() {
                this.set_unusualOrderVisible(false);
            },
            // afterVisibleChange(id) {
            //     this.getUnusualOrderList(id)
            // },
            checkin(id) {
                this.checkIn(id)
            },
        }
    }
</script>

<style scoped>

</style>

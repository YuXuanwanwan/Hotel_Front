<template>
    <div>
        <a-modal
                :visible="roomVisible"
                title="房间列表"
                width="900px"
                :footer="null"
                @cancel="cancel"
        >
            <div style="width: 100%; text-align: right; margin:20px 0">
                <a-button type="primary" @click="addRoom">
                    <a-icon type="plus"/>
                    添加房型
                </a-button>
            </div>
            <a-table
                    :columns="columns"
                    :dataSource="roomList"
                    bordered
            >
                <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small" @click="manageNum(record)">数量调整</a-button>
                        <a-divider type="vertical"></a-divider>

                        <a-button type="primary" size="small" @click="managePrice(record)">价格调整</a-button>
                        <a-divider type="vertical"></a-divider>

                    <a-popconfirm
                            title="确定想删除该房型吗？"
                            @confirm="delRoom(record.id)"
                            okText="确定"
                            cancelText="取消"
                    >
                            <a-icon type="delete" theme="twoTone" twoToneColor="red"/>
                        </a-popconfirm>

                    </span>

            </a-table>
        </a-modal>
        <managePrice :record="clickedRecord"></managePrice>
        <manageNum :record="clickedRecord"></manageNum>
        <addRoomModal></addRoomModal>
    </div>

</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import managePrice from './managePrice'
    import manageNum from './manageNum'
    import addRoomModal from "./addRoomModal";

    const columns = [
        // 这里定义列表头
        {
            title: '房间id',
            dataIndex: 'id',
        },
        {
            title: '房型',
            dataIndex: 'roomType',
        },
        {
            title: '原价',
            dataIndex: 'price',
        },
        {
            title: '剩余量',
            dataIndex: 'curNum',
        },
        {
            title: '总数量',
            dataIndex: 'total',
        },
        {
            title: '宾馆id',
            dataIndex: 'hotelId',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },

    ];
    export default {
        name: 'roomModal',
        data() {
            return {
                columns,
                clickedRecord: {}

            }
        },
        components: {
            managePrice,
            manageNum,
            addRoomModal,
        },
        computed: {
            ...mapGetters([
                'roomVisible',
                'roomList',
            ])
        },
        methods: {
            ...mapMutations([
                'set_addRoomModalVisible',
                'set_roomVisible',
                'set_managePriceVisible',
                'set_manageNumVisible',
                'set_activeRoomId',
            ]),
            ...mapActions([
                'getHotelRoom',
                'deleteRoom',
            ]),
            cancel() {
                this.set_roomVisible(false)
            },

            managePrice(record) {// 改变状态，自动渲染
                this.clickedRecord = record;
                this.set_activeRoomId(record.id)
                this.set_managePriceVisible(true)
                console.log('23')

            },
            manageNum(record) {// 改变状态，自动渲染
                this.clickedRecord = record;
                this.set_activeRoomId(record.id)
                this.set_manageNumVisible(true)
                console.log('23')

            },
            addRoom() {// 改变状态，自动渲染
                console.log('123')
                this.set_addRoomModalVisible(true),
                    this.set_roomVisible(false)
            },
            delRoom(id) {
                this.deleteRoom(id)
            },
        },
    }
</script>
<style scoped>

</style>
<template>
    <div class="info-wrapper">
        <a-tabs>

            <a-tab-pane tab="我的信息" key="1">
                <a-form :form="form" style="margin-top: 30px">
                    <a-form-item label="用户ID" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.id}}</span>
                    </a-form-item>
                    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-input
                                placeholder="请填写用户名"
                                v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名' }] }]"
                                v-if="modify"
                        />
                        <span v-else>{{ userInfo.userName }}</span>
                    </a-form-item>
                    <a-form-item label="邮箱" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.email }}</span>
                    </a-form-item>
                    <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-input
                                placeholder="请填写手机号"
                                v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入手机号' }] }]"
                                v-if="modify"
                        />
                        <span v-else>{{ userInfo.phoneNumber}}</span>
                    </a-form-item>
                    <a-form-item label="信用值" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.credit }}</span>
                    </a-form-item>
                    <a-form-item label="会员等级" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <div v-if="userInfo.credit < 100">
                            <span>非会员</span>
                        </div>
                        <div v-if="(userInfo.credit >= 100)&&(userInfo.credit < 1000)">
                            <span>初级会员</span>
                        </div>
                        <div v-if="(userInfo.credit >= 1000)&&(userInfo.credit < 5000)">
                            <span>中级会员</span>
                        </div>
                        <div v-if="userInfo.credit >= 5000">
                            <span>高级会员</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }" v-if="modify">
                        <a-input
                                placeholder="请输入新密码"
                                v-decorator="['password', { rules: [{ required: true, message: '请输入新密码' }] }]"
                        />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="modify">
                        <a-button type="primary" @click="saveModify">
                            保存
                        </a-button>
                        <a-button type="default" style="margin-left: 30px" @click="cancelModify">
                            取消
                        </a-button>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 8, offset: 4 }" v-else>
                        <a-button type="primary" @click="modifyInfo">
                            修改信息
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>

            <a-tab-pane tab="我的订单" key="2">
                <a-table
                        :columns="columns"
                        :dataSource="userOrderList"
                        bordered
                >
                    <span slot="price" slot-scope="text">
                        <span>￥{{ text }}</span>
                    </span>
                    <span slot="roomType" slot-scope="text">
                        <span v-if="text == 'BigBed'">大床房</span>
                        <span v-if="text == 'DoubleBed'">双床房</span>
                        <span v-if="text == 'Family'">家庭房</span>
                    </span>
                    <a-tag slot="orderState" color="blue" slot-scope="text">
                        {{ text }}
                    </a-tag>
                    <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small" @click="orderInfo(record.id)">查看</a-button>
                        <a-divider type="vertical" v-if="record.orderState === '已入住'||record.orderState === '已退房'"></a-divider>
                        <a-button size="small" @click="commentTheRecord(record.id)" v-show="record.orderState === '已入住'||record.orderState==='已退房'">评价</a-button>
                        <a-modal
                                :visible="visible"
                                title="评论"
                                cancelText=""
                                okText=""
                                @cancel="cancel"
                                @ok="handleSubmit">
                            <a-form-item label="综合评分" v-bind="formItemLayout">
                                <a-select class="commentRate" v-model="commentRate">
                                <a-select-option value="1">1</a-select-option>
                                <a-select-option value="2">2</a-select-option>
                                <a-select-option value="3">3</a-select-option>
                                <a-select-option value="4">4</a-select-option>
                                <a-select-option value="5">5</a-select-option>
                            </a-select>
                            </a-form-item>
                            <a-form-item v-bind="formItemLayout" label="详细评论">
                                <a-textarea
                                        :rows="4"
                                        v-model="commentValue"
                                        placeholder="请输入评论">
                            </a-textarea>
                            </a-form-item>
                        </a-modal>
                        <a-divider type="vertical" v-if="record.orderState === '已预订'"></a-divider>
                        <a-popconfirm
                                title="你确定撤销该笔订单吗？"
                                @confirm="confirmCancelOrder(record.id)"
                                @cancel="cancelCancelOrder"
                                okText="确定"
                                cancelText="取消"
                                v-if="record.orderState === '已预订'"
                        >
                            <a-button type="danger" size="small">撤销</a-button>
                        </a-popconfirm>

                    </span>
                </a-table>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    const columns = [
        {
            title: '订单号',
            dataIndex: 'id',
        },
        {
            title: '酒店名',
            dataIndex: 'hotelName',
        },
        {
            title: '房型',
            dataIndex: 'roomType',
            scopedSlots: { customRender: 'roomType' }
        },
        {
            title: '入住时间',
            dataIndex: 'checkInDate',
            scopedSlots: { customRender: 'checkInDate' }
        },
        {
            title: '离店时间',
            dataIndex: 'checkOutDate',
            scopedSlots: { customRender: 'checkOutDate' }
        },
        {
            title: '入住人数',
            dataIndex: 'peopleNum',
        },
        {
            title: '房价',
            dataIndex: 'price',
            scopedSlots: { customRender: 'price' }
        },
        {
            title: '状态',
            filters: [{ text: '已预订', value: '已预订' }, { text: '已撤销', value: '已撤销' }, { text: '已入住', value: '已入住' }, { text: '已退房', value: '已退房' }],
            onFilter: (value, record) => record.orderState.includes(value),
            dataIndex: 'orderState',
            scopedSlots: { customRender: 'orderState' }
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

    ];
    export default {
        name: 'info',
        data(){
            return {
                formItemLayout: {
                    labelCol: {
                        xs: { span: 12 },
                        sm: { span: 6 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
                modify: false,
                formLayout: 'horizontal',
                pagination: {},
                columns,
                data: [],
                form: this.$form.createForm(this, { name: 'coordinated' }),
                visible:false,
                commentValue:'',
                commentRate:'',
            }
        },
        components: {
        },
        computed: {
            ...mapGetters([
                'userId',
                'userInfo',
                'userOrderList',
                'iconChoose'
            ])
        },
        async mounted() {
            await this.getUserInfo()
            await this.getUserOrders()
        },
        methods: {
            ...mapActions([
                'getUserInfo',
                'getUserOrders',
                'updateUserInfo',
                'cancelOrder',
                'userCommentGet'
            ]),
            orderInfo(id){
                let order
                this.userOrderList.forEach((item)=>{
                    if(item.id==id){
                        order=item
                    }
                })
                const h = this.$createElement;
                this.$info({
                    title: '订单详情',
                    content: h('div', {}, [
                        h('p', '\n'),
                        h('p', '订单id:   '+order.id),
                        h('p', '订单状态:   '+order.orderState),
                        h('p', '用户名:   '+order.clientName),
                        h('p', '酒店名称:   '+order.hotelName),
                        h('p', '入住时间:   '+order.checkInDate),
                        h('p', '离店时间:   '+order.checkOutDate),
                        h('p', '房间类型:   '+order.roomType),
                        h('p', '房间数量:   '+order.roomNum),
                        h('p', '人数:   '+order.peopleNum),
                        h('p', order.haveChild?'有无儿童:   有':'有无儿童:   无'),
                        h('p', '手机号码:   '+order.phoneNumber),
                        h('p', '总价:   '+order.price+'元'),

                    ]),
                    onOk() {},
                });
            },

            saveModify() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        const data = {
                            userName: this.form.getFieldValue('userName'),
                            phoneNumber: this.form.getFieldValue('phoneNumber'),
                            password: this.form.getFieldValue('password'),
                            birthday: this.form.getFieldValue('birthday')?this.form.getFieldValue('birthday'):null,
                            enterprise: this.form.getFieldValue('enterprise')?this.form.getFieldValue('enterprise'):null
                        }
                        this.updateUserInfo(data).then(()=>{
                            this.modify = false
                        })
                    }
                });
            },
            modifyInfo() {
                setTimeout(() => {
                    this.form.setFieldsValue({
                        'userName': this.userInfo.userName,
                        'phoneNumber': this.userInfo.phoneNumber,
                        'birthday':this.userInfo.birthday,
                        'enterprise':this.userInfo.enterprise,
                        'password':this.userInfo.password
                    })
                }, 0)
                this.modify = true
            },
            cancelModify() {
                this.modify = false
            },
            confirmCancelOrder(orderId){
                this.cancelOrder(orderId)
            },
            cancelCancelOrder() {

            },
            commentTheRecord(orderId){
                console.log("comments")
                this.visible = true
            },
            cancel(){
                this.commentValue = ''
                this.visible = false
                let date = new Date();
                let strDate = date.toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
                console.log(strDate);
            },
            handleSubmit(){
                console.log(this.userInfo)
                var data = {
                    author: this.userInfo.userName,
                    avatar: this.iconChoose,
                    rate: this.commentRate,
                    content: this.commentValue,
                    date: this.getDate()
                }
                this.userCommentGet(data)
                this.commentValue = ''
                this.commentRate = ''
                this.visible = false
            },
            getDate(){
                let date = new Date();
                let strDate = date.toLocaleString();
                console.log(strDate);
                return strDate
            }

        }
    }
</script>
<style scoped lang="less">
    .info-wrapper {
        padding: 50px;
        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>
<style lang="less">
    .info-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
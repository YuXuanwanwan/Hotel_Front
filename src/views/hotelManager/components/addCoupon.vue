<template xmlns:a-form="http://www.w3.org/1999/html">
    <a-modal
            :visible="addCouponVisible"
            title="添加优惠策略"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
            <a-form-item label="优惠券类型" v-bind="formItemLayout">
                <a-select
                        v-decorator="
                    [ 'type',
                    { rules: [{ required: true, message: '请选择类型' }] }
                    ]"
                        @change="changeType"
                >
                    <a-select-option value="2">酒店多间特惠（三间以及以上）</a-select-option>
                    <a-select-option value="3">酒店满减特惠</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="券名" v-bind="formItemLayout">
                <a-input
                        placeholder="请填写券名"
                        v-decorator="['name', { rules: [{ required: true, message: '请输入券名' }] }]"
                />
            </a-form-item>
            <a-form-item label="优惠简介" v-bind="formItemLayout">
                <a-input
                        type="textarea"
                        :rows="4"
                        placeholder="请填写优惠简介"
                        v-decorator="['description', { rules: [{ required: true, message: '请填写优惠简介' }] }]"/>
            </a-form-item>
            <a-form-item label="达标金额" v-bind="formItemLayout">
                <a-input
                        placeholder="请填写达标金额"
                        v-decorator="['targetMoney',{rules:[{required:true,message:'请填写达标金额'}]}]"
                />
            </a-form-item>
            <a-form-item label="优惠金额" v-bind="formItemLayout">
                <a-input
                        placeholder="请填写优惠金额"
                        v-decorator="['discountMoney',{rules:[{required:true,message:'请填写优惠金额'}]}]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="优惠时间">
                <a-range-picker
                        format="YYYY-MM-DDThh:mm:ss"
                        v-decorator="[
                        'date',
                        {
                            rules: [{ required: true, message: '请选择时间' }]
                        }
                    ]"
                        :placeholder="['起始时间','结束时间']"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    const moment = require('moment')

    export default {
        name: 'addCouponModal',
        data() {
            return {
                formItemLayout: {
                    labelCol: {
                        xs: {span: 12},
                        sm: {span: 6},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 16},
                    },
                },
                couponTime: Array,
                hasCouponTime: false,
                couponType: 0,
            }
        },

        computed: {
            ...mapGetters([
                'activeHotelId',
                'addCouponVisible',
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'addCouponModal'});
        },
        mounted() {

        },
        methods: {
            onChange(date, dateString) {
                this.hasCouponTime = true;
                this.couponTime = dateString;
            },
            ...mapMutations([
                'set_addCouponVisible'
            ]),
            ...mapActions([
                'addHotelCoupon'
            ]),
            resetDicount() {
                this.form.resetFields(`discount`, '')
            },//暂时没有用
            resetTargetMoney() {
                this.form.resetFields(`targetMoney`, '')
                this.form.resetFields(`discountMoney`, '')
            },//暂时没有用
            cancel() {
                this.set_addCouponVisible(false)
            },
            changeType(v) {
                this.couponType = v;
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            // 这里添加接口参数
                            name: this.form.getFieldValue('name'),
                            description: this.form.getFieldValue('description'),
                            type: Number(this.form.getFieldValue('type')),
                            targetMoney: isNaN(Number(this.form.getFieldValue('targetMoney'))) ? 0 : Number(this.form.getFieldValue('targetMoney')),
                            discountMoney: isNaN(Number(this.form.getFieldValue('discountMoney'))) ? 0 : Number(this.form.getFieldValue('discountMoney')),
                            hotelId: Number(this.activeHotelId),
                            discount: isNaN(Number(this.form.getFieldValue('discount'))) ? 0 : Number(this.form.getFieldValue('discount')),
                            status: 1,
                            //hasCouponTime: this.hasCouponTime == true ? 1 : 0,//好像ture or false
                            startTime: moment(this.form.getFieldValue('date')[0]).format('YYYY-MM-DDThh:mm:ss'),
                            endTime: moment(this.form.getFieldValue('date')[1]).format('YYYY-MM-DDThh:mm:ss'),
                        };
                        console.log(data)
                        this.addHotelCoupon(data);
                    }
                });
            },//响应按钮的按下，调用action方法
        }
    }
</script>
<style scoped lang="less">
    /*.ant-tabs-nav-scroll {*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*}*/
    .collapse {
        border-radius: 4px;
        border: 0;
        margin-bottom: 0;
        margin-left: 10px;
    }
</style>
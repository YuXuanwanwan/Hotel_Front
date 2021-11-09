<template>
    <a-modal
            :visible="addWebStrategyModalVisible"
            title="添加网站优惠策略"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" v-bind="formItemLayout">
            <a-form-item label="优惠券类型" v-bind="formItemLayout">
                <a-select
                        v-decorator="[
                    'type',
                    { rules: [{ required: true,message: '请选择优惠券类型'}] }]"
                        @change="changeType"
                >
                    <a-select-option value="1">网站限时优惠</a-select-option>
                    <a-select-option value="2">网站多间优惠（三间以及以上）</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="券名" v-if="modify">
                <a-input
                        placeholder="请填写优惠券名"
                        v-decorator="['name', { rules: [{ required: true, message: '请填写优惠券名' }] }]"
                />
            </a-form-item>
            <a-form-item label="优惠简介" v-bind="formItemLayout" v-if="modify">
                <a-input
                        type="textarea"
                        :rows="4"
                        placeholder="请填写优惠简介"
                        v-decorator="['description', { rules: [{ required: true, message: '请填写优惠简介' }] }]"
                />
            </a-form-item>
            <a-form-item label="折扣" v-bind="formItemLayout" v-if="checkDiscount">
                <a-input
                        placeholder="请填写折扣"
                        v-decorator="['discount', { rules: [{ required: true, message: '请填写折扣' }, { validator: this.handleDiscount }], validateTrigger: 'blur'}]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="开始/结束日期" >
                <a-range-picker
                        format="YYYY-MM-DD"
                        v-decorator="[
                        'date',
                        {
                            rules: [{ required: true, message: '请选择开始/结束日期' }]
                        }
                    ]"
                        :placeholder="['开始日期','结束日期']"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    const moment = require('moment')
    export default {
        name: 'addWebCouponModal',
        data() {
            return {
                modify: false,
                check1: false,
                check2: false,
                check3: false,
                check4: false,
                checkDiscount: false,
                checkDiscountMoney: false,
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
            }
        },
        computed: {
            ...mapGetters([
                'marketerCouponList',
                'addWebStrategyModalVisible',
                'marketerHotelId',
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'addWebCouponModal' });
        },
        mounted() {

        },
        methods: {
            ...mapMutations([
                'set_addWebStrategyModalVisible'
            ]),
            ...mapActions([
                'addWebTimeCoupon',
                'addWebMultiplyRoomsCoupon',
            ]),
            cancel() {
                this.set_addWebStrategyModalVisible(false)
            },
            changeType(v){
                if(v=='4'){

                }
                else if(v=='3'){

                }
                else if(v=='2'){
                    this.modify=true;
                    this.check1=false;
                    this.check2=true;
                    this.check3=false;
                    this.check4=false;
                    this.checkDiscount=true;
                    this.checkDiscountMoney=false;
                }
                else if(v=='1'){
                    this.modify=true;
                    this.check1=true;
                    this.check2=false;
                    this.check3=false;
                    this.check4=false;
                    this.checkDiscount=true;
                    this.checkDiscountMoney=false;
                }
                else{
                    this.$message.warning('请实现')
                }
            },
            handleDiscount(rule, value, callback){
                if(isNaN(value)){
                    callback(new Error('折扣必须是在0和1之间的小数！'));
                } else if(Number(value)<=0||Number(value)>=1){
                    callback(new Error('折扣必须是在0和1之间的小数！'));
                }else {
                    callback();
                }
                callback()
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        if(Number(this.form.getFieldValue('type'))===1){
                            const data = {
                                type: Number(4),
                                name: this.form.getFieldValue('name'),
                                description: this.form.getFieldValue('description'),
                                startTime: moment(this.form.getFieldValue('date')[0]).format('YYYY-MM-DDThh:mm:ss'),
                                endTime: moment(this.form.getFieldValue('date')[1]).format('YYYY-MM-DDThh:mm:ss'),
                                discount: Number(this.form.getFieldValue('discount')),
                                hotelId: this.marketerHotelId

                            }
                            this.addWebTimeCoupon(data)
                        }
                        if(Number(this.form.getFieldValue('type'))===2){
                            const data = {
                                type: Number(2),
                                name: this.form.getFieldValue('name'),
                                description: this.form.getFieldValue('description'),
                                roomNum: Number(this.form.getFieldValue('roomNum')),
                                startTime: moment(this.form.getFieldValue('date')[0]).format('YYYY-MM-DDThh:mm:ss'),
                                endTime: moment(this.form.getFieldValue('date')[1]).format('YYYY-MM-DDThh:mm:ss'),
                                discount: Number(this.form.getFieldValue('discount')),
                                hotelId: this.marketerHotelId

                            }
                            this.addWebMultiplyRoomsCoupon(data)
                        }
                    }
                });
            },
        }
    }
</script>
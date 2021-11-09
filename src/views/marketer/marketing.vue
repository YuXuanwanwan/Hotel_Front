<template>
    <div class="marketing-wrapper">
        <a-form :form="form">
        <a-tabs
        :active-key="customActiveKey"
        @change="handleTabClick"
        >
            <a-tab-pane tab="网站优惠策略" key="1">
                <div style="width: 100%; text-align: right; margin:20px 0">
                    <a-button type="primary" @click="addWebCoupon"><a-icon type="plus" />添加网站优惠策略</a-button>
                </div>
                <a-table bordered :dataSource="marketerCouponList" :columns="columns" >
                </a-table>
            </a-tab-pane>

        </a-tabs>
        </a-form>
        <AddWebCoupon></AddWebCoupon>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AddWebCoupon from './components/addWebCouponModal'
const moment = require('moment')
const columns = [
    {
        title:'优惠类型',
        dataIndex:'couponType',
    },
    {
        title:'优惠券名',
        dataIndex:'couponName',
    },
    {
        title: '优惠简介',
        dataIndex: 'description'
        },
    {
        title: '折扣',
        dataIndex: 'discount'
    },
];
 export default {
     name: "marketing",
     components: {
         AddWebCoupon
     },
     data() {
         return {
             customActiveKey: '网站优惠策略',
             form: this.$form.createForm(this),
             marketerCouponList: '',
             columns
         }
     },
     computed: {
         ...mapGetters([
             'marketerCouponList'
         ])
     },
     async mounted() {
         await this.getMarketerCoupon()
     },
     methods: {
         ...mapMutations([
             'set_addWebStrategyModalVisible'
         ]),
         ...mapActions([
             'getMarketerCoupon',
             'setVip'
         ]),
         addWebCoupon() {
             this.set_addWebStrategyModalVisible(true)
         },
         handleTabClick (key) {
             this.customActiveKey = key
         },
     }
 }
</script>
<style scoped lang="less">
    .marketing-wrapper {
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
    .marketing-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
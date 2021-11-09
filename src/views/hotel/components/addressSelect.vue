<template>
    <div class="container">
        <a-row  class="row" type="flex">
            <a-col span="3" class="col">
                <a-button class="bt" :class="{isbtActive:btactive}" @click="sort">综合排序</a-button>
            </a-col>
            <a-col span="3" class="col">
                <a-tooltip placement="topLeft" :title="pricelowToHIgh?'价格从低到高':'价格从高到低'" >
                    <a-button @click="sortPrice" class="bt" :class="{ispriceActive:priceactive}">{{price_sort}}</a-button>
                </a-tooltip>
            </a-col>
            <a-col span="3" class="col">
                <a-tooltip placement="topLeft" title="评分从高到低">
                    <a-button @click="sortRate" class="bt" :class="{israteActive:rateactive}" >{{ rateactive?'评分从高到低':'评分'}}</a-button>
                </a-tooltip>
            </a-col>
            <a-col span="3">
                <span>地址:</span>
            </a-col>
            <a-col span="3" class="col">
                <a-cascader class="address_select"
                        :options="options"
                        :default-value="address_"
                        expand-trigger="hover"
                        @change="addressChange"

                />
            </a-col>
            <a-col span="3">
                <span>商圈:</span>
            </a-col>
            <a-col span="3">
                <a-select class="district_select"
                          v-model="bizRegion" style="width: 90%;"
                            @change="bizRegionChange">
                    <a-select-option v-for="(item) in bizRegion_select" :key="item">{{item}}</a-select-option>

                </a-select>
            </a-col>

        </a-row>
    </div>
</template>
<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    export default {
        name: "addressSelect",
        data() {
            return {
                price_sort:'价格',
                rate_sort:'评分',
                pricelowToHIgh:null,

                btactive:true,
                priceactive:false,
                rateactive:false,
                address_:['江苏', '南京'],
                bizRegion:'新街口',
                bizRegion_select:[ '新街口','仙林中心','老门东','奥体中心','玄武湖','夫子庙'],
                options: [
                    {
                        value: '江苏',
                        label: '江苏',
                        children: [
                            {
                                value: '南京',
                                label: '南京',
                            },
                            {
                                value: '苏州',
                                label: '苏州',
                            }
                        ],
                    },
                    {
                        value: '上海',
                        label: '上海',
                        children: [
                            {
                                value: '浦东新区',
                                label: '浦东新区',
                            },

                        ],
                    },
                ],
                bizRegions:[
                    {
                        name:'南京',
                        value:[
                            '新街口','仙林中心','老门东','奥体中心','玄武湖','夫子庙'
                        ]
                    },
                    {
                        name:'苏州',
                        value:[
                            '东方之门','乐桥','东太湖','拙政园'
                        ]
                    },
                    {
                        name:'浦东新区',
                        value:[
                            '浦东机场','陆家嘴'
                        ]
                    }
                ]
            };
        },
        computed: {
            ...mapGetters([
                'hotelListLoading'
            ])
        },
        methods: {
            ...mapMutations([
                'set_hotelListParams',
                'set_hotelListLoading',
                'set_addRegion',
                'set_rankAll',
                'set_typeAll'
            ]),

            ...mapActions([
                'getHotelList',
                'addRegionFilter',
                'priceSort',
                'rateSort'
            ]),
            addressChange(value) {
                if(value.length!==0) {
                    this.set_hotelListLoading(true)
                    this.address_ = value
                    this.bizRegions.forEach((item) => {
                        if (item.name == value[value.length-1]) {
                            this.bizRegion_select = item.value
                            this.bizRegion=item.value[0]

                        }
                    })
                    const params={
                        address:this.address_[this.address_.length-1],
                        bizRegion:this.bizRegion
                    }
                    console.log(params)
                    this.set_addRegion(params)
                    this.$options.methods.sort.bind(this)();
                    this.set_rankAll(true)
                    this.set_typeAll(true)
                    this.$emit('changeSelectBox')
                }

            },
            bizRegionChange(v){
                this.set_hotelListLoading(true)
                const params={
                    address:this.address_[this.address_.length-1],
                    bizRegion:this.bizRegion
                }
                console.log(params)
                this.set_addRegion(params)
                this.$options.methods.sort.bind(this)();
                this.set_rankAll(true)
                this.set_typeAll(true)
                this.$emit('changeSelectBox')

            },
            //综合排序
            sort(){
                this.btactive=true
                this.priceactive=false
                this.rateactive=false
                this.price_sort='价格'
                this.rate_sort='评分'
                this.addRegionFilter()
            },
            sortPrice(){
                this.priceactive=true
                this.rateactive=false
                this.btactive=false
                this.pricelowToHIgh=!this.pricelowToHIgh
                if(this.pricelowToHIgh){
                    this.price_sort='价格从低到高'
                }
                else{
                    this.price_sort='价格从高到低'
                }
                this.priceSort()
            },
            sortRate(){
                this.priceactive=false
                this.price_sort='价格'
                this.pricelowToHIgh=true
                this.rateactive=!this.rateactive
                if(this.rateactive){
                    this.rateSort()
                    this.btactive=false
                }
                else if(!this.rateactive&&!this.priceactive){
                    this.$options.methods.sort.bind(this)();
                }
            },

        },
    };
</script>

<style scoped>
    .container{
        width: 100%;
        margin: 0 auto;
        border: 1px solid #ffffff;
        border-top:1px solid #1890ff;

    }
    .row{
        height: 40px;
        line-height: 40px;
    }
    .col{
        /*border-left: 1px solid #ffffff;*/
    }
    .bt{
        background-color: #f0f2f5;
        border-radius: 0;
        border: 0;
        border-bottom: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        color:#2c3e50;
        height: 100%;
        width: 100%;
    }
    .bt:hover{
        background-color: #ffffff;
        color: #1890ff;
    }

    .isbtActive{
        color: #1890ff;
        border-right: 1px solid #f0f2f5;
        background-color: #ffffff;
    }
    .ispriceActive{
        border-left: 1px solid #f0f2f5;
        border-right: 1px solid #f0f2f5;
        color: #1890ff;
        background-color: #ffffff;

    }
    .israteActive{
        border-left: 1px solid #f0f2f5;

        color: #1890ff;
        background-color: #ffffff;

    }
    .address_select{
        display: inline-block;
        text-align: left;
        width: 100%;

    }

    .district_select{
        display: inline-block;
        width: 100%;
        border-right: 1px solid #ffffff;
    }
</style>
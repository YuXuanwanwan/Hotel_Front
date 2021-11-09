<template>
    <div class="filter-box">
        <div class="filter-header">
            <span class="filter-text">筛选条件<a-icon type="right"/></span>
            <a href="#" class="tag-select" v-show="rankAll">
                <span>酒店星级: ALL</span>
            </a>
            <a href="#" class="tag-select" v-show="typeAll">
                <span>房间类型: ALL</span>
            </a>
            <a href="#" v-for="(item,index) in selectBox" class="tag-select" :key="index">
                <span>{{item.text}}</span>
                <i @click="removeCurrentSelect(index)">&times;</i>
            </a>
            <a-button class="unfold" @click="unfold">{{unfold_box ?'收起更多':'更多选项'}}
                <a-icon v-if="unfold_box" type="up"/>
                <a-icon v-else type="down"/>
            </a-button>
        </div>

        <transition name="select-box">
            <div class="box" v-show="unfold_box">
                <a-row class="row" type="flex">
                    <a-col span="2">酒店名称:</a-col>
                    <a-col span="5">
                        <a-input class="input-select2" v-model="hotel_name"
                                 placeholder="可输入酒店名称精准查找"
                        />
                    </a-col>
                </a-row>
                <a-row v-for="(item,index) in filterBox" :key="index" class="row" type="flex">
                    <a-col span="2">{{item.name}}</a-col>
                    <a-col span="3">
                        <a href="#"
                           @click="allChange(item,index)"
                           class="text-filter" :class="activeAllChange(index)">
                            <span>全部</span>
                        </a>
                    </a-col>
                    <a-col span="3" v-for="(v,i) in item.items" :key="i">
                        <a href="#"
                           @click="clickrange(index,v,i)"
                           class="text-filter" :class="{ isActive:v.active}">
                            <span>{{v.text}}</span>
                        </a>
                    </a-col>
                </a-row>
                <a-row class="row" type="flex">
                    <a-col span="2">评分区间:</a-col>
                    <a-col span="5">
                        <a-select class="input-select"
                                  v-model="start_score">
                            <a-select-option value="1">1.0</a-select-option>
                            <a-select-option value="2">2.0</a-select-option>
                            <a-select-option value="3">3.0</a-select-option>
                            <a-select-option value="4">4.0</a-select-option>
                            <a-select-option value="5">5.0</a-select-option>
                        </a-select>
                        <span> ~ </span>
                        <a-select class="input-select"
                                  v-model="end_score">
                            <a-select-option value="1">1.0</a-select-option>
                            <a-select-option value="2">2.0</a-select-option>
                            <a-select-option value="3">3.0</a-select-option>
                            <a-select-option value="4">4.0</a-select-option>
                            <a-select-option value="5">5.0</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col span="2">价格区间:</a-col>
                    <a-col span="5">
                        <a-input class="input-select" v-model="start_price"
                                 placeholder="￥"
                        />
                        <span> ~ </span>
                        <a-input class="input-select" v-model="end_price"
                                 placeholder="￥"
                        />
                    </a-col>
                </a-row>
                <a-row class="row" type="flex">
                    <a-col span="2">预定间数:</a-col>
                    <a-col span="5">
                        <a-select class="input-select2"
                                  v-model="nums">
                            <a-select-option value="1">1</a-select-option>
                            <a-select-option value="2">2</a-select-option>
                            <a-select-option value="3">3</a-select-option>
                            <a-select-option value="4">4</a-select-option>
                            <a-select-option value="5">5</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col span="2">日期:</a-col>
                    <a-col span="11">
                        <a-range-picker
                                class="date_picker"
                                format="YYYY-MM-DD"
                                @change="changeDate"
                                :disabled-date="disabledDate"
                                :placeholder="['预计入住日期','预计退房日期']"
                        />
                    </a-col>
                </a-row>
                <a-row class="row" type="flex">
                    <a-col span="24">
                        <a-button type="primary" style="margin-right: 5px;" @click="determine">确定</a-button>
                        <a-button type="normal" style="margin-left: 5px;" @click="cancel">取消</a-button>
                    </a-col>
                </a-row>
            </div>
        </transition>
        <address-select @changeSelectBox="changeSelectBox"></address-select>
    </div>
</template>

<script>
    import addressSelect from "./addressSelect";
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    const moment = require('moment')
    export default {
        name: "filterBox",
        components: {
            addressSelect
        },
        data() {
            return {
                unfold_box: false,
                btnTxt: false,
                selectBox: [],
                text_scores: '评分区间:',
                text_numbers: '数量',
                text_prices: '价格区间',
                text_date: '日期',
                date: null,
                nums: null,
                hotel_name: null,
                start_price: null,
                end_price: null,
                start_score: null,
                end_score: null,
                start_date: '',
                end_date: '',
                select_times:0,
                orderState:'全部',
                filterBox: [
                    {
                        name: '酒店星级:',
                        items: [
                            // {value: 'rank0', text: '全部', active: true},
                            {value: 'rank1', text: '五星级',text_en:'Five' ,active: false},
                            {value: 'rank2', text: '四星级',text_en:'Four', active: false},
                            {value: 'rank3', text: '三星级',text_en:'Three', active: false}
                        ]
                    },
                    {
                        name: '房间类型:',
                        items: [
                            // {value: 'type0', text: '全部', active: true},
                            {value: 'type2', text: '双床房',text_en:'DoubleBed' , active: false},
                            {value: 'type3', text: '大床房',text_en:'BigBed' , active: false},
                            {value: 'type4', text: '家庭房', text_en:'Family' ,active: false}
                        ]
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
                'hotelListLoading',
                'rankAll',
                'typeAll'
            ]),
            activeAllChange:function () {
                return (index)=>{
                    return index==0?{isActive:this.rankAll}:{isActive:this.typeAll}
                }
            }
        },

        methods: {
            ...mapMutations([
                'set_hotelListParams',
                'set_hotelListLoading',
                'set_rankAll',
                'set_typeAll'
            ]),

            ...mapActions([
                'getHotelList',
                'filterHotelList',
                'addRegionFilter'
            ]),
            disabledDate(current) {
                // Can not select days before today and today
                return current&&current < moment().startOf('day');
            },
            //点击更多选项时触发
            unfold: function () {
                this.unfold_box = !this.unfold_box;
                this.btnTxt = !this.btnTxt;
                this.select_times=0
                if(!this.unfold_box)
                    this.$options.methods.determine.bind(this)();
            },
            //检查Select_Box中的rank和type
            checkEmptyRankandType(){
                let rankflag=false
                let typeflag=false
                this.selectBox.forEach((v,i)=>{
                    if(v.value.search('rank') !== -1){
                        rankflag=true
                    }
                    if(v.value.search('type') !== -1){
                        typeflag=true
                    }
                })
                if(!rankflag) {
                    this.set_rankAll(true)
                }
                else
                    this.set_rankAll(false)
                if(!typeflag){
                    this.set_typeAll(true)
                }
                else
                    this.set_typeAll(false)

            },
            // 点击全部时调用
            allChange(item,index){
                switch (index) {
                    case 0:
                        this.set_rankAll(true)
                        break
                    case 1:
                        this.set_typeAll(true)
                        break
                }
                item.items.forEach((v, i) => {
                    v.active = false
                });

                this.selectBox=this.selectBox.filter((v, i) => {
                    return v.active==true
                });

            },
            //按钮点击时调用
            clickrange(parentIndex, el, childIndex) {

                var item = this.filterBox[parentIndex].items;
                //选中除全部外的数据
                item.filter((v, i) => {
                    if (i === childIndex) {
                        if (v.active === true) {
                            v.active = !v.active;
                            this.selectBox.filter((childEl, childI) => {
                                if (childEl.active === false) {
                                    this.selectBox.splice(childI, 1);
                                }
                            });
                        } else if (this.selectBox.length < 8) {
                            v.active = !v.active; // 选中和反选
                            this.selectBox.push(v); // 选中的数组
                        } else {
                            alert("标签最多只能选8个")
                        }
                    }

                })
                this.$options.methods.checkEmptyRankandType.bind(this)();
            },
            //移除标签时调用
            removeCurrentSelect(index) {
                this.filterBox.filter((el) => {
                    el.items.filter((data) => {
                        if (data.text == this.selectBox[index].text) {
                            data.active = false;
                        }
                    });
                });
                this.selectBox.splice(index, 1)
                this.$options.methods.checkEmptyRankandType.bind(this)();
                if(!this.unfold_box){
                const data = {
                    hotelName: this.hotel_name?String(this.hotel_name):null,//酒店名称,default:null
                    hotelStars: this.getranks(),//酒店星级,数组,default:[]
                    roomTypes: this.gettypes(),//房间类型,数组,default:[]
                    //评分区间
                    startRate: this.start_score?Number(this.start_score):0.0,//default:0.0
                    endRate: this.end_score?Number(this.end_score):5.0,//default:5.0
                    //价格区间
                    startPrice: this.start_price?Number(this.start_price):0.0,//default:0.0
                    endPrice: this.end_price?Number(this.end_price):1000000,//default:0.0
                    //房间数量
                    roomNum: this.nums?Number(this.nums):1,
                    //日期
                    startDate:this.start_date,//default:''
                    endDate: this.end_date//default:''
                }
                // console.log("data:",data)
                this.filterHotelList(data)
                }
            },
            //日期格式化
            changeDate(v) {
                this.start_date=moment(v[0]).format('YYYY-MM-DD')
                this.end_date=moment(v[1]).format('YYYY-MM-DD')
            },
            determine() {
                this.unfold_box = false
                this.select_times=this.selectBox.length
                this.set_hotelListLoading(true)
                const data = {
                    hotelName: this.hotel_name?String(this.hotel_name):null,//酒店名称,default:null
                    hotelStars: this.getranks(),//酒店星级,数组,default:[]
                    roomTypes: this.gettypes(),//房间类型,数组,default:[]
                    //评分区间
                    startRate: this.start_score?Number(this.start_score):0.0,//default:0.0
                    endRate: this.end_score?Number(this.end_score):5.0,//default:5.0
                    //价格区间
                    startPrice: this.start_price?Number(this.start_price):0.0,//default:0.0
                    endPrice: this.end_price?Number(this.end_price):1000000,//default:0.0
                    //房间数量
                    roomNum: this.nums?Number(this.nums):1,
                    //日期
                    startDate:this.start_date,//default:''
                    endDate: this.end_date//default:''
                }
                console.log("data:",data)
                this.filterHotelList(data)
            },
            cancel() {
                this.unfold_box = false
                this.selectBox=this.selectBox.filter((item)=>{
                    item.active=false
                    return item.active==true
                })
                this.set_rankAll(true)
                this.set_typeAll(true)
            },
            //向后端传递参数时所需的ranks
            getranks() {
                let ranks = []
                this.selectBox.forEach((item, index) => {
                    if (item.value.search('rank') !== -1) {
                        ranks.push(item.text_en)
                    }
                })
                if(ranks.length===0){
                    this.filterBox[0].items.forEach((item,index)=>{
                            ranks.push(item.text_en)
                    })
                }
                return ranks
            },
            //向后端传递参数时所需的types
            gettypes() {
                let types = []
                this.selectBox.forEach((item, index) => {
                    if (item.value.search('type') !== -1) {
                        types.push(item.text)
                    }
                })
                if(types.length===0){
                    this.filterBox[1].items.forEach((item,index)=>{
                            types.push(item.text)
                    })
                }
                return types
            },
            //addressSelect中地址和商圈改变时调用这个函数
            changeSelectBox(){
                this.selectBox.forEach((item)=>{
                    item.active=false
                })
                this.selectBox=[]
            }

        }

    }


</script>

<style scoped>
    .filter-box {
        width: 100%;
        margin: 0 auto;
        border: 1px solid #e8f4fd;
        padding: 25px 15px;
    }

    .filter-header {
        display: inline-block;
        text-align: left;
        height: 40px;
        width: 100%;
    }

    .filter-text {
        float: left;
        margin-top: 8px;
        line-height: 20px;
        margin-left: 10px;
    }
    .isNotRankAll{
        display: none;
    }
    .isNotTypeAll{
        display: none;
    }
    .box {
        height: 240px;
        overflow: hidden;
        background-color: #f0f2f5;
    }

    .unfold {

        float: right;
        text-align: center;
        vertical-align: center;
        cursor: pointer;
    }

    .select-box-leave-active,
    .select-box-enter-active {
        transition: all 1s ease;
    }

    .select-box-leave-active,
    .select-box-enter {
        height: 0 !important;
    }

    .select-box-leave, .select-box-enter-active {
        height: 200px;
    }

    .text-filter {
        text-decoration: none;
        display: inline-block;
        /*width:60px;*/
        color: #404040;
    }

    .row {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid white;
    }

    .text-filter span {

        display: block;
        isplay: inline-block;
        text-align: center;
        width: 60px;
        line-height: 30px;


    }

    .text-filter :hover {
        /*color: #ffffff;*/
        animation: myfirst .5s;
        -moz-animation: myfirst 1s; /* Firefox */
        -webkit-animation: myfirst 1s; /* Safari and Chrome */
        -o-animation: myfirst 1s; /* Opera */
        animation-fill-mode: forwards;
    }

    .tag-select {
        text-decoration: none;
        height: 20px;
        line-height: 20px;
        border: 1px solid #1890ff;
        border-radius: 2px;
        color: #1890ff;
        text-align: center;
        font-size: 14px;
        padding: 0 5px;
        margin-top: 8px;
        margin-left: 15px;
        float: left;

    }

    .tag-select i {
        display: inline-block;
        height: 100%;
        font-size: 15px;
        padding: 0 5px;
    }

    .input-select {
        display: inline-block;
        width: 43%;
    }
    .input-select2 {
        display: inline-block;
        width: 93%;
    }
    .state_select{
        display: inline-block;
        width: 90%;
    }

    .nums_select {
        display: inline-block;
        width: 90%;
    }

    .date_picker {
        width: 96.7%;
    }

    .isActive {

        background-color: #1890ff;
        border-radius: 5px;
        animation: mysecond 0.2s;
        -moz-animation: mysecond 0.2s; /* Firefox */
        -webkit-animation: mysecond 0.2s; /* Safari and Chrome */
        -o-animation: mysecond 0.2s; /* Opera */
        animation-fill-mode: forwards;
    }

    @keyframes myfirst {
        from {
            opacity: 1.0;
        }
        to {
            opacity: 0.5;
        }
    }

    @keyframes mysecond {
        from {
            color: #404040;;
        }
        to {
            color: #ffffff;
        }
    }
</style>
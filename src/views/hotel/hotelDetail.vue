<template>
    <a-layout>
        <a-layout-content>
            <div class="hotelDetailCard">
                <h1>
                    {{ currentHotelInfo.title }}
                </h1>
                <div class="hotel-info">
                    <a-card hoverable class="hotelCard ant-col-xs-7 ant-col-lg-5 ant-col-xxl-3">
                        <img v-if="currentHotelInfo.id==1"
                             alt="example"
                             src="@/assets/hanting.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==2"
                             alt="example"
                             src="@/assets/Rujia.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==3"
                             alt="example"
                             src="@/assets/jinling.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==4"
                             alt="example"
                             src="@/assets/nanda.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==5"
                             alt="example"
                             src="@/assets/qitian.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==6"
                             alt="example"
                             src="@/assets/W.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==7"
                             alt="example"
                             src="@/assets/shuxiang.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==8"
                             alt="example"
                             src="@/assets/Jinjiang.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else-if="currentHotelInfo.id==9"
                             alt="example"
                             src="@/assets/xinjiyuan.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                        <img v-else
                             alt="example"
                             src="@/assets/dongjing.jpg"
                             slot="cover"
                             referrerPolicy="no-referrer"
                        />
                    </a-card>
                    <div class="info">
                        <div class="items" v-if="currentHotelInfo.name">
                            <span class="label">酒店名称：</span>
                            <span class="name">{{ currentHotelInfo.name }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.address">
                            <span class="label">地址:</span>
                            <span class="value">{{ currentHotelInfo.address }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.rate">
                            <span class="label">评分:</span>
                            <span class="value">{{ currentHotelInfo.rate }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.hotelStar">
                            <span class="label">星级:</span>
                            <a-rate v-if="currentHotelInfo.hotelStar=='One'" style="font-size: 15px" :value=1 disabled allowHalf/>
                            <a-rate v-if="currentHotelInfo.hotelStar=='Two'" style="font-size: 15px" :value=2 disabled allowHalf/>
                            <a-rate v-if="currentHotelInfo.hotelStar=='Three'" style="font-size: 15px" :value=3 disabled allowHalf/>
                            <a-rate v-if="currentHotelInfo.hotelStar=='Four'" style="font-size: 15px" :value=4 disabled allowHalf/>
                            <a-rate v-if="currentHotelInfo.hotelStar=='Five'" style="font-size: 15px" :value=5 disabled allowHalf/>
                        </div>
                        <div class="items" v-if="currentHotelInfo.description">
                            <span class="label">酒店简介:</span>
                            <span class="value">{{ currentHotelInfo.description }}</span>
                        </div>
                    </div>
                </div>
                <a-divider></a-divider>
                <a-tabs>
                    <a-tab-pane tab="房间信息" key="1">
                        <RoomList :rooms="currentHotelInfo.rooms"></RoomList>
                    </a-tab-pane>
                    <a-tab-pane tab="酒店详情" key="2">
                        <span class="value">{{ currentHotelInfo.description }}</span>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import RoomList from './components/roomList'
    export default {
        name: 'hotelDetail',
        components: {
            RoomList,
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'currentHotelInfo',
            ])
        },
        mounted() {
            this.set_currentHotelId(Number(this.$route.params.hotelId))
            this.getHotelById()
        },
        beforeRouteUpdate(to, from, next) {
            this.set_currentHotelId(Number(to.params.hotelId))
            this.getHotelById()
            next()
        },
        methods: {
            ...mapMutations([
                'set_currentHotelId',
            ]),
            ...mapActions([
                'getHotelById'
            ])
        }
    }
</script>
<style scoped lang="less">
    .hotelDetailCard {
        padding: 50px 50px;
    }
    .hotel-info {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        .info{
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .items {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .label{
                    margin-right: 10px;
                    font-size: 18px;
                }
                .name{
                    margin-right: 15px;
                    font-size: 18px;
                }
                .value {
                    margin-right: 15px;
                }
            }
        }
    }
    .hotelCard {
        margin: 10px 10px;
        min-width: 180px;
        max-height: 350px;
        img {
            height: 250px;
        }
    }
</style>

<template>
  <a-card hoverable class="hotelCard ant-col-xs-7 ant-col-lg-5 ant-col-xxl-3">
    <img v-if="hotel.id==1"
         alt="example"
         src="@/assets/hanting.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==2"
         alt="example"
         src="@/assets/Rujia.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==3"
         alt="example"
         src="@/assets/jinling.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==4"
         alt="example"
         src="@/assets/nanda.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==5"
         alt="example"
         src="@/assets/qitian.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==6"
         alt="example"
         src="@/assets/W.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==7"
         alt="example"
         src="@/assets/shuxiang.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==8"
         alt="example"
         src="@/assets/Jinjiang.jpg"
         slot="cover"
         referrerPolicy="no-referrer"
    />
    <img v-else-if="hotel.id==9"
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
    <a-tooltip :title="hotel.title" placement="top">
      <a-card-meta :title="hotel.name">
        <template slot="description">
          <a-rate v-if="hotel.hotelStar=='One'" style="font-size: 15px" :value=1 disabled allowHalf/>
          <a-rate v-if="hotel.hotelStar=='Two'" style="font-size: 15px" :value=2 disabled allowHalf/>
          <a-rate v-if="hotel.hotelStar=='Three'" style="font-size: 15px" :value=3 disabled allowHalf/>
          <a-rate v-if="hotel.hotelStar=='Four'" style="font-size: 15px" :value=4 disabled allowHalf/>
          <a-rate v-if="hotel.hotelStar=='Five'" style="font-size: 15px" :value=5 disabled allowHalf/>
          {{hotel.rate}}分
          <div></div>
          {{hotel.description}}
        </template>
      </a-card-meta>
    </a-tooltip>
  </a-card>
</template>
<script>
  export default {
    name:'',
    props: {
      hotel: {}
    },
    data() {
      return{

      }
    },
  }
</script>
<style scoped lang="less">
  .hotelCard {
    margin: 10px 10px;
    min-width: 180px;
    max-height: 350px;
    img {
      height: 250px;
    }
  }
</style>

<style lang="less">
  .hotelCard{
    .ant-card-body{
      padding: 12px
    }
  }

  .ant-card-hoverable:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.4)
  }

</style>

<template>
    <div class="header">
        <div class="label">
            <img src="@/assets/logo.png" class="logo" alt="logo" @click="jumpToHome">
            <span class="title">好订-互联网酒店系统</span>
            
        </div>
        <a-menu v-model="current" mode="horizontal" theme="light">
            <a-menu-item key="1" @click="selectMenu">
                <router-link to="/hotel/hotelList">
                    <a-icon type="home" />首页
                </router-link>
            </a-menu-item>
            <a-menu-item key="2" @click="jumpToUserInfo" v-if="userInfo.userType=='Client'">
                <a-icon type="user" />个人中心
            </a-menu-item>
            <a-menu-item key="3" @click="selectMenu" v-if="userInfo.userType=='HotelManager'">
                <router-link :to="{ name: 'manageHotel'}">
                     <a-icon type="switcher" />酒店管理
                </router-link>
            </a-menu-item>
            <a-menu-item key="4" @click="selectMenu" v-if="userInfo.userType=='Manager'">
                <router-link :to="{ name: 'manageUser'}">
                     <a-icon type="user" />网站管理
                </router-link>
            </a-menu-item>
            <a-menu-item key="5" @click="selectMenu" v-if="userInfo.userType=='Marketer'">
                <router-link :to="{ name: 'marketing'}">
                    <a-icon type="switcher" />营销管理
                </router-link>
            </a-menu-item>
        </a-menu>
        <div class="logout">
            <a-dropdown placement="bottomCenter">
                <div class="user">
                    <div v-if="userInfo.userType === 'HotelManager'">
                        <a-avatar src="https://lililizi.oss-cn-beijing.aliyuncs.com/color_%E9%85%92%E5%BA%97.png"></a-avatar>
                    </div>
                    <div v-if="userInfo.userType === 'Manager'">
                        <a-avatar src="https://lililizi.oss-cn-beijing.aliyuncs.com/90-%E7%9A%87%E5%86%A0%20%281%29.png"></a-avatar>
                    </div>
                    <div v-if="userInfo.userType === 'Marketer'">
                        <a-avatar src="https://lililizi.oss-cn-beijing.aliyuncs.com/%E8%90%A5%E9%94%80%E5%91%98.png"></a-avatar>
                    </div>
                    <div v-if="userInfo.userType === 'Client'">
                        <a-avatar src="https://lililizi.oss-cn-beijing.aliyuncs.com/%E4%BA%BA.png"></a-avatar>
                    </div>
                    <span style="font-size: 14px">{{ userInfo.userName }}</span>
                    <a-icon style="margin-left: 3px; font-size: 16px" type="down"></a-icon>
                </div>
                <a-menu slot="overlay">
                    

                <a-menu-item @click="jumpToUserInfo()">
                    <a-icon type="profile"></a-icon>
                    我的信息
                </a-menu-item>
                <a-menu-item @click="quit()">
                    <a-icon type="poweroff"></a-icon>
                    退出登录
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>

    </div>
    
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: '',
    data() {
        return {
            current: ['1']
        }
    },
    computed: {
        ...mapGetters([
            'userId',
            'userInfo'
        ])
    },
    mounted() {
        if (this.$route.name == 'hotelList' || this.$route.name == 'hotelDetail') {
            this.current = ['1']
        }else if(this.$route.name == 'userInfo') {
            this.current = ['2']
        }else if(this.$route.name == 'manageHotel') {
            this.current = ['3']
        }else {
            this.current = ['4']
        }
    },
    methods: {
        ...mapMutations([

        ]),
        ...mapActions([
            'logout'
        ]),
        selectMenu(v){
        },
        async quit() {
            await this.$store.dispatch('logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        jumpToUserInfo() {
            this.$router.push({ name: 'userInfo', params: { userId: this.userId } })
        },
        jumpToHome() {
            
        }
    }
}
</script>
<style scoped lang="less">
    .header {
        display: flex;
        line-height: 44px;
        height: 44px;
        align-items: center;
        justify-content: space-between;
        min-width: 800px;
        .label{
            height: 44px;
            line-height: 44px;
            vertical-align: middle;
            min-width: 400px;

            .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
            cursor: pointer;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }

          .search {
              width: 300px; 
              margin-left: 30px
          }
        }
        .logout {
            margin-right: 40px;
            .user {
                cursor: pointer;
                display:flex;
                align-items: center;
                span {
                    margin-left: 5px
                }
            }
        }

    }
</style>
<style lang="less">
    .header {
        .ant-menu {
            background: none
        }
    }
</style>
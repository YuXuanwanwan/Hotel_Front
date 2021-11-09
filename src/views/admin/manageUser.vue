<template>
    <div class="manageUser-wrapper">
        <a-tabs>
            <a-tab-pane tab="账户管理" key="1">
                <div style="width: 100%; text-align: right; margin:20px 0">
                    <a-button type="primary" @click="addManager"><a-icon type="plus" />添加用户</a-button>
                </div>
                <a-table
                    :columns="columns"
                    :dataSource="managerList"
                    rowKey='email'
                    bordered
                >
                    <span slot="action" slot-scope="text">
                        <a-button type="danger" @click="changeUserInfo(text)">修改信息</a-button>
                        <a-modal v-model="changeUserInfoVisible" title="修改个人信息" ok-text="确认" cancel-text="取消" @ok="handleModal" :maskStyle="{'opacity':'0.2','animation':'none'}"
                        >
                            <template>
                            <a-Form :label-col="{ span: 5}" :wrapper-col="{ span: 16 }">
                                <a-form-item label="邮箱">
                                    <p>{{$store.state.admin.userInfo1.email}}</p>
                                </a-form-item>
                                <a-form-item label="用户名">
                                    <a-input v-model="user_from.username"
                                            v-decorator="[
                                             { rules: [{ required: true, message: 'Please input your username' }] },]"
                                            :placeholder='$store.state.admin.userInfo1.id'/>
                                </a-form-item>

                                <a-form-item label="密码">
                                    <a-input v-model="user_from.password"
                                            v-decorator="[
                                    { rules: [{ required: true, message: 'Please input your password' }] },]"
                                            :placeholder='$store.state.admin.userInfo1.password'/>
                                </a-form-item>

                                <a-form-item label="电话号码">
                                    <a-input v-model="user_from.phone"
                                            v-decorator="[
                                    { rules: [{ required: true, message: 'Please input your phonenumber' }] },]"
                                            :placeholder='$store.state.admin.userInfo1.phone'/>
                                </a-form-item>

                                <a-form-item label="用户权限">
                                    <a-input v-model="user_from.usertype"
                                            v-decorator="[
                                    { rules: [{ required: true, message: 'Please input your usertype' }] },]"
                                            :placeholder='$store.state.admin.userInfo1.type'/>
                                </a-form-item>
                            </a-Form>
                                </template>
                            </a-modal>


                        <a-popconfirm
                                title="Are you sure to delete this account?"
                                ok-text="Yes"
                                cancel-text="No"
                                @confirm="confirmtodelete_user($store.state.admin.userInfo1.email)"
                        >
                        <a-button type="danger" @click="deleteAccount1(text)" style="margin-left:20px;">删除用户</a-button>
                        </a-popconfirm>

                    </span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane tab="酒店管理" key="2">
                    <a-button type="primary" @click="addHotel"><a-icon type="plus" />添加酒店</a-button>
                <a-modal v-model="addHotelVisible" title="添加酒店" ok-text="确认" cancel-text="取消" @ok="handleaddhotel" :maskStyle="{'opacity':'0.2','animation':'none'}"
                >
                    <a-Form  :label-col="{ span: 5}" :wrapper-col="{ span: 16 }" >

                        <a-form-item label="酒店名">
                            <a-input v-model="hotel_from.hotelname"
                                    v-decorator="[
                                    { rules: [{ required: true, message: 'Please input hotelname' }] },]"
                                    placeholder='Please input hotelname'/>
                        </a-form-item>

                        <a-form-item label="管理员账号">
                            <a-input v-model="hotel_from.email"
                                    v-decorator="[
                                    { rules: [{ required: true, message: 'Please input hotelMangerAccount' }] },]"
                                    placeholder='Please input hotelMangerAccount' />
                        </a-form-item>
                    </a-Form>
                </a-modal>


                    <a-button type="primary" @click="changeHotelManager" style="margin-left:20px;"><a-icon type="form" />修改酒店管理员</a-button>

                <a-modal v-model="changeHotelManagerVisible" title="更改酒店管理员" ok-text="搜索" cancel-text="取消" @ok="searchHotel" :maskStyle="{'opacity':'0.2','animation':'none'}"
                >
                    <a-Form :label-col="{ span: 5}" :wrapper-col="{ span: 16 }" >

                        <a-form-item label="酒店名">
                            <a-input v-model="hotel_search.name"
                                     v-decorator="[
                                    { rules: [{ required: true, message: 'Please input hotelName' }] },]"
                                     placeholder='Please input hotelName' />
                        </a-form-item>

                    </a-Form>
                </a-modal>

                <a-modal v-model="hotelListVisible" title="酒店列表"  :maskStyle="{'opacity':'0.2','animation':'none'}"
                         cancel-text="取消" @ok="searchHotel_1">
                    <a-table :columns="columns1" :data-source="hotelList" rowKey='id'
                             bordered>
                         <span slot="action" slot-scope="text">
                             <a-button type="danger" @click="changeManagerId(text)">修改管理员</a-button>
                         </span>>
                    </a-table>>
                    <a-modal v-model="changeManagerVisible" title="更改管理员" ok-text="确认" cancel-text="取消" @ok="yes_tochange" :maskStyle="{'opacity':'0.2','animation':'none'}"
                    >
                        <a-Form :label-col="{ span: 5}" :wrapper-col="{ span: 16 }" >

                            <a-form-item label="管理员id">
                                <a-input v-model="managerIdChange.managerId"
                                         v-decorator="[
                                    { rules: [{ required: true, message: 'Please input ManagerId' }] },]"
                                         placeholder='Please input new ManagerId' />
                            </a-form-item>

                        </a-Form>
                    </a-modal>
                </a-modal>

            </a-tab-pane>
        </a-tabs>

        <AddManagerModal></AddManagerModal>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AddManagerModal from './components/addManagerModal';
import {delAccountAPI} from '@/api/admin';
import {changeUserAPI} from '@/api/admin';
import {addHotelManagerAPI} from '@/api/admin';
import {searchHotelAPI} from '@/api/admin';
import {changeHotelManagerAPI} from '@/api/admin';

import {message} from "ant-design-vue";
const columns = [
    {
        title: '用户id',
        dataIndex: 'id',
    },
    {  
        title: '用户邮箱',
        dataIndex: 'email',
    },
    {  
        title: '用户名',
        dataIndex: 'userName',
    },
    {
        title: '用户密码',
        dataIndex: 'password',
    },
    {
        title: '用户手机号',
        dataIndex: 'phoneNumber',
    },
    {
        title: '信用值',
        dataIndex: 'credit',
    },
    {
        title: '用户类型',
        dataIndex: 'userType',
        filters: [
            {
                text: 'Manager',
                value: 'Manager',
            },
            {
                text: 'Client',
                value: 'Client',
            },
            {
                text: 'HotelManager',
                value: 'HotelManager',
            },
            {
                text: 'Marketer',
                value: 'Marketer',
            },
        ],
        onFilter: (value, record) => record.userType.indexOf(value) === 0,
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];

const columns1 = [
    {
        title: '酒店id',
        dataIndex: 'id',
    },
    {
        title: '酒店名',
        dataIndex: 'hotelName',
    },
    {
        title: '酒店管理员id',
        dataIndex: 'managerId',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

const hotelList = [

];

export default {
    name: 'manageHotel',
    data(){
        return {
            hotelList,
            columns1,
            formLayout: 'horizontal',
            pagination: {},
            columns,
            data: [],
            form: this.$form.createForm(this, { name: 'manageUser' }),
            changeUserInfoVisible: false,
            addHotelVisible:false,
            hotelListVisible:false,
            changeManagerVisible:false,
            changeHotelManagerVisible:false,
            user_from:{
                email:'',
                username:'',
                password:'',
                usertype:'',
                phone:''
            },
            hotel_from: {
                hotelname:'',
                email:'',
            },
            hotel_search: {
                name: ''
            },
            managerIdChange:{
                id:'',
                managerId:''
            }
        }
    },
    components: {
        AddManagerModal
    },
    computed: {
        ...mapGetters([
            'addManagerModalVisible',
            'managerList'
        ])
    },
    mounted() {
      this.getManagerList()
    },
    methods: {
        ...mapActions([
            'getManagerList',

        ]),
        ...mapMutations([
            'set_addManagerModalVisible',
        ]),
        addManager(){
            this.set_addManagerModalVisible(true)
        },
        changeUserInfo(text){
            console.log(text)
            this.changeUserInfoVisible = true//每次点开重置输入
            this.user_from.email=text.email
            this.user_from.username=text.userName
            this.user_from.password=text.password
            this.user_from.usertype=text.userType
            this.user_from.phone=text.phoneNumber
            this.$store.commit('set_userInfo11',text)
        },
        handleModal() {
            this.changeUserInfoVisible = false
            if(this.user_from.password.length<6){
                message.error('修改失败,密码不能小于6位')
            }
            else if(this.user_from.usertype!='Manager'&&this.user_from.usertype!='Client'&&this.user_from.usertype!='HotelManager'&&this.user_from.usertype!='Marketer') {
                message.error('修改失败,请输入正确的用户类型')
            }
            else {
                changeUserAPI({
                    email: this.user_from.email,
                    username: this.user_from.username,
                    password: this.user_from.password,
                    usertype: this.user_from.usertype,
                    phone: this.user_from.phone
                }).then(res => {
                    this.getManagerList()
                    message.success('修改成功')
                })
                console.log(this.user_from)
            }
        },
        deleteAccount1(text){
            this.$store.commit('set_userInfo11',text)
        },
        addHotel(){
            this.hotel_from.email=''
            this.hotel_from.hotelname=''
            this.addHotelVisible = true
        },
        handleaddhotel(){
            this.addHotelVisible = false
            addHotelManagerAPI({hotelname:this.hotel_from.hotelname,email:this.hotel_from.email}).then(res => {
                this.getManagerList()
                if(res==true){
                    message.success("添加成功")
                }
            })
        },
        changeHotelManager(){
            this.hotel_search.name=''
            this.changeHotelManagerVisible=true
        },
        searchHotel(){
            this.changeHotelManagerVisible=false
            searchHotelAPI({hotelname:this.hotel_search.name}).then(res => {
                this.hotelListVisible=true
                this.hotelList=res
                console.log(res)
            })
        },
        confirmtodelete_user(e) {//确认删除
            console.log(e)
            delAccountAPI({email:e}).then(res => {
                this.getManagerList()
                message.success('删除成功')
            })
        },
        changeManagerId(e){
            this.changeManagerVisible=true
            this.managerIdChange.id=e.id
            this.managerIdChange.managerId=''
        },
        yes_tochange(){
            this.changeManagerVisible=false
            changeHotelManagerAPI({id:this.managerIdChange.id,managerId:this.managerIdChange.managerId}).then(res => {
                this.searchHotel()
                if(res==true){
                    message.success("修改成功")
                }
            })
        },
        searchHotel_1(){
            this.hotelListVisible=false
        }
    }
}
</script>
<style scoped lang="less">
    .manageUser-wrapper {
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
    .manageUser-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">
    
</style>
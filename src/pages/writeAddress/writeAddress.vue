<template>
    <div>
        <p class="add">收货地址</p>
        <ul>
            <li>
                <span>联系省市</span>
                <div @click="showPicker">
                    <p>{{values[0]}}</p>
                    <p>{{values[1]}}</p>
                    <p>{{values[2]}}</p>
                </div>
            </li>
            <li>
                <span>详细地址</span>
                <input v-model="phone" />
            </li>
            <li>
                <span>联系电话</span>
                <input v-model="address" placeholder="请输入联系电话" />
            </li>
            <li>
                <span>联系人</span>
                <input v-model="phone" placeholder="请输入联系人" />
            </li>
        </ul>
        <div class="packet" @click="showMask">
            <img src="@/assets/ee-icon.png" alt="">
        </div>
        <button class="goWork" @click="goWorking">确认</button>
        <mt-popup
            v-model="popupVisible"
            position="bottom"
        >
            <mt-picker :slots="slots" @change="onValuesChange">

            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { Picker,Popup, MessageBox } from 'mint-ui';
import { share } from '@/api/index.js'
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
export default {
    data() {
        return {
            address:"",
            phone:"",
            popupVisible:false,
            slots:[],
            values:['北京','北京市','东城区']
        }
    },
    created() {
        window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
            title:"分享一图",
            imgUrl:"http://img.hb.aicdn.com/db75e0fe6b448adcf78adffc6ea81112e37469bb694b74-tOuFo2_fw658",
            link:"http://huaban.com/pins/2186353016/"
        }
    },
    mounted () {
        console.log(this.$route.query.id)
        this.changeActiveIndex({
            index:this.$route.query.id
        })
    },
    methods : {
        ...mapMutations({
            changeActiveIndex:"indexStore/changeActiveIndex"
        }),
        showPicker(){
            this.popupVisible = true;
            console.log(this.cityinit)
            this.slots = [
                {
                    values:this.cityinit.map(item=>item.name),
                    flex:1
                },
                {
                    values:this.cityinit[0].list.map(item=>item.name),
                    flex:1
                },
                {
                    values:this.cityinit[0].list[0].list.map(item=>item.name),
                    flex:1
                }
            ]
        },
        onValuesChange(picker,value){
            this.values = value;
            let firstName = picker.getSlotValue(0);
            let second = this.cityinit.filter(item=>item.name===firstName)[0].list.map(item=>item.name);
            picker.setSlotValues(1, second)
            let secondName = picker.getSlotValue(1);
            let thirdName = this.cityinit.filter(item=>item.name===firstName)[0].list.filter(item=>item.name===secondName)[0].list.map(item=>item.name);
            picker.setSlotValues(2, thirdName)
        },
        showMask(){
            MessageBox({
                title: '福利到',
                message: `<img src="/src/assets/coupon.png"/>`,
                showCancelButton: true,
                showConfirmButton:true,
                cancelButtonText:"给钱都不要",
                confirmButtonText:"果断分享"
            }).then(action=>{
                if( action === 'cancel' ){
                    return 
                }else{
                    share()
                }
            })
            
        },
        goWorking(){
            this.$router.push({
                path:'/upload',
                query:{
                    id:2
                }
            })
        }
    },
    computed: {
        ...mapState({
            activeIndex:state=>state.indexStore.activeIndex,
            cityinit:state=>state.picker.cityinit
        })
    },
}
</script>
<style lang="scss">
    $baseline-px:37.5px;
    @function px2rem ($px-values) {
        $baseline-rem: $baseline-px / 1rem * 1;
        $px-values: $px-values / $baseline-rem;
        @return $px-values;
    }
    .add{
        width: 100%;
        line-height: px2rem(30px);
        color:rgb(190, 190, 190);
        font-size: px2rem(16px);
        text-align: center;
    }
    ul{
        width: 100%;
        padding:0 px2rem(10px);
        background: #fff;
        li{
            padding:px2rem(5px) 0;
            display: flex;
            justify-content: space-between;
            height:px2rem(45px);
            font-size: px2rem(16px);
            line-height: px2rem(35px);
            position: relative;
            &::after{
                content:"";
                display: inline-block;
                width: 98%;
                height:1px;
                position: absolute;
                bottom:0;
                left:0;
                background: #eee;
            }
            >div{
                display: flex;
                width: px2rem(150px);
                justify-content: space-between;
            }
            input{
                text-align: right;
                outline: none;
                border:0;
                font-size: px2rem(15px);
            }
        }
    }
    .goWork{
        width: 100%;
        background: rgb(134, 134, 134);
        text-align: center;
        line-height: px2rem(40px);
        height:px2rem(40px);
        position: fixed;
        left:0;
        bottom:0;
        color:#fff;
        font-size: px2rem(16px);
        border:0;
        outline: none;
    }
    .packet{
        position: absolute;
        right:px2rem(10px);
        bottom:px2rem(60px);
        width: px2rem(50px);
        height:px2rem(50px);
        img{
            width: 100%;
            height:100%;
        }
    }
    .mint-msgbox-message>img{
        width: 100%;
        height:auto;
    }
    .mint-popup-bottom{
        width: 100%;
    }
</style>
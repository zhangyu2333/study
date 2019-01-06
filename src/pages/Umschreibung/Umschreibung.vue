<template>
    <div>
        <div class="banner">
            <Banner></Banner>
        </div>
        <div class="upload">
            <ul>
                <li v-for="(item,index) in upload" :key="index">
                    <div @click="show_Eg(index)">
                        <img v-if="item.src" :src="item.src">
                        <img v-else class="add" :src="addImg">
                    </div>
                    <span>{{item.desc}}</span>
                </li>
                <div :class="showMark? 'mark active':'mark'">
                    <img :src="current.pic"  :class="showMark? 'active':''">
                    <div :class="showMark? 'active':''">
                        <button @click="uploads(1)">拍照</button>
                        <button @click="uploads(2)">相册</button>
                        <button @click="cancel">取消</button>
                    </div>
                </div>
            </ul>
        </div>
        <ul class="sel">
            <li @click="selectMold(0)">
                <p>服务类型</p>
                <span>{{type}}></span>
            </li>
            <li @click="selectMold(1)">
                <p>
                    <span>当前驾照签发城市</span>

                </p>
                <p>{{address.join('')}}</p>
            </li>
            <li @click="selectMold(2)">
                <span>可补换的签发城市</span>
                <span>{{carAddress.join('')}}</span>
            </li>
            <li>
                <p>服务费</p>
                <div>￥{{money}}</div>
            </li>
        </ul>
        <div class="discounts">
            <p>优惠</p>
            <p>></p>
        </div>
        <div class="more_discounts">
            <a href=""><u>常见问题</u></a>
        </div>
        <footer>
            <div>
                <span>
                    实付:
                </span>
                {{money}}
            </div>
            <p>立即支付</p>
        </footer>
        <mt-popup
            v-model="popupVisible"
            position="bottom"
        >
            <mt-picker :slots="slots" :showToolbar="showToolbar" @change="onValuesChange">

            </mt-picker>
        </mt-popup>
        
    </div>
    
</template>
<script>
import Vue from 'vue';
import add from '@/assets/add.png';
import { mapState, mapMutations, mapActions } from 'vuex';
import {uploadImg,cityList} from '@/api/index';
import Banner from '../../components/banner/banner';
import { Picker,Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
export default {
    created () {
        this.getCityList()
    },
    data () {
        return {
            popupVisible:false,
            selectIndex:0,
            showMark:false,
            showToolbar:true,
            current:{},
            type:"换驾照",
            slots: [],
            address:["请选择签发地"],
            carAddress:["请选择补换地"]
        }
    },
    components: {
        Banner
    },
    computed: {
        addImg(){
            return add
        },
        ...mapState({
            upload:state=>state.upload.uploadList,
            cityList:state=>state.picker.cityList,
            costList:state=>state.picker.costList,
            city:state=>state.picker.city,
            money:state=>state.picker.money
        })
    },
    methods: {
        ...mapMutations({
            updateUploadList:'upload/updateUploadList',
            updateState: 'picker/updateState'
        }),
        ...mapActions({
            getCityList:"picker/getCityList",
            getCarCityList:"picker/getCarCityList"
        }),
        async selectMold(index){
            this.selectIndex = index;
            this.popupVisible = true;
            if( index === 0 ){
                this.slots = [
                    {
                        values: ['换驾照', '补驾照'],
                    }
                ]
            }else if( index === 1 ){
                this.slots = [
                    {
                        values: this.cityList.map(item=>item.name),
                    },
                    {    
                        values: this.cityList[0].list.map(item=>item.name),
                    }
                ]
            }else if(index === 2){
                await this.getCarCityList()
                this.slots = [
                    {
                        values: this.costList.map(item=>item.name)
                    },
                    {
                        values: this.costList[0].list.map(item=>item.name)
                    }
                ]
            }
        },
        show_Eg(index){ 
            this.current = this.upload[index];
            this.showMark = true;
        },
        async uploads(type){
            let res = await uploadImg(type);
            if (res.result == 1){
                this.updateUploadList({
                    src: res.data.url,
                    index: this.upload.findIndex(item=>item==this.current)
                })
                this.showMark = false;
            }else{
                alert('上传图片失败');
            }
        },
        cancel(){
            this.showMark = false;
        },
        onValuesChange(picker, values){
            if( !this.selectIndex ){
                this.type = values[0];
            }else if(this.selectIndex===1){
                let obj = this.cityList.filter(item=>item.name===values[0])[0].list;
                let cityArr = obj.map(item=>item.name);
                picker.setSlotValues(1, cityArr)
                this.address = values
                this.updateState({city: this.address})
            }else{
                let obj = this.costList.filter(item=>item.name===values[0])[0].list;
                let cityArr = obj.map(item=>item.name);
                picker.setSlotValues(1, cityArr)
                this.carAddress = values
                this.updateState({cost: values})
            }
        },
    },
}
</script>
<style lang="scss" scoped>
    $baseline-px:37.5px;
    @function px2rem ($px-values) {
        $baseline-rem: $baseline-px / 1rem * 1;
        $px-values: $px-values / $baseline-rem;
        @return $px-values;
    }
    .banner{
        width: 100%;
        height:3rem;
    }
    .upload{
        width: 100%;
        height:px2rem(100px);
        background: #fff;
        margin-top:px2rem(10px);
        >ul{
            width: 100%;
            height:100%;
            display: flex;
            justify-content: space-around;
            padding:px2rem(10px) 0;
            overflow: hidden;
            li{
                width: 16%;
                height:px2rem(80px);
                >div{
                    width: 100%;
                    height: px2rem(50px);
                    border:1px solid rgba(153, 153, 153, 0.692);
                    padding:px2rem(5px) px2rem(10px);
                    border-radius: px2rem(10px);
                    img{
                        width: 100%;
                        height:auto;
                    }
                }
            }
            .mark{
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height:100%;
                z-index: 200;
                text-align: center;
                visibility: hidden;
                background: rgba(34, 34, 34, 0);
                transition: all 0.3s;
                &.active{
                    background: rgba(34, 34, 34, 0.7);
                    left:0;
                    visibility: visible;
                }
                img{
                    width: 80%;
                    height:auto;
                    transition: all 0.3s;
                    transform: translateY(-110%);
                    &.active{
                        transform: translateY(50px);
                    }
                }
                >div{
                    transition: all 0.3s;
                    position: absolute;
                    bottom:0;
                    width: 100%;
                    overflow: hidden;
                    transform: translateY(110%);
                    &.active{
                        transform: translateY(0);
                    }
                    button{
                        width: 100%;
                        line-height: px2rem(40px);
                        background: #fff;
                        border:0;
                        outline: none;
                        font-size: px2rem(18px);
                    }
                }
            }
        }
    }
    
    .sel{
        width: 100%;
        padding-left:px2rem(10px);
        background: #fff;
        margin-top: px2rem(15px);
        li{
            width: 100%;
            height:px2rem(40px);
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
            padding-right:px2rem(10px);
            font-size: px2rem(16px);
            line-height: px2rem(40px);
            >div{
                color:red
            }
        }
        .picker-toolbar{
            display: flex;
        }
    }
    .discounts{
        background: #fff;
        padding:0 px2rem(10px);
        width: 100%;
        display: flex;
        justify-content: space-between;
        height:px2rem(40px);
        font-size: px2rem(16px);
        line-height: px2rem(40px);
        margin-top: px2rem(20px);
    }
    .more_discounts{
        width: 100%;
        text-align: center;
        a{
            font-size: px2rem(14px);
            line-height: px2rem(50px);
            color:#3aaffd;
        }
    }
    footer{
        width: 100%;
        position: absolute;
        bottom:0;
        left:0;
        height:px2rem(50px);
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding-left:px2rem(20px);
        line-height: px2rem(50px);
        font-size: px2rem(16px);
        >div{
            color:red;
            span{
                color:#222;
            }
        }
        >p{
            width: px2rem(100px);
            height:100%;
            background: #999;
            color:#fff;
            text-align: center;
            &.active{
                background: #3aaffd;
            }
        }
    }
    .mint-popup-bottom{
        width: 100%;
    }
</style>

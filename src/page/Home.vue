<template>
    <div class="wrapper">
        <Gheader bgcolor="linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%)" @go-back="back" box_bottom="true" :indexback="false" @showImg="history" :showRight="true">
            <div class="center flex flex_aic" slot="top_select">
                <img src="@/assets/img/common/logo.png" alt="">
                <span class="title fs_18 fb color_ff ml_5">apple123</span>
            </div>
        </Gheader>
        <div class="swipe_lunbo w100">
            <van-swipe ref="lunbo" :loop="false" @change="onChange" :show-indicators="true" indicator-color="white">
                <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="bannergopage(item)">
                    <div><img :src="item.img_url" alt=""></div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <ul class="matchTabbar flex mb_8">
            <li @click="selectTabbar(item, index)" :class="matchTabbarIndex == index ? 'active' : ''" v-for="(item, index) in matchTabbar" :key="index">{{ item.name }}
                <img v-if="matchTabbarIndex == index" src="@/assets/img/common/triangle.png" alt="">
            </li>
        </ul>
        <transition name="blockList">
            <div class="blockList" v-show="matchTabbarIndex == 0">
                <ul class="listWrap flex">
                    <li @click="selectDate(item, index)" v-for="(item, index) in itmeBlock" :key="index" :class=" index == dateIndex ? 'flex flex_fdc flex_shk flex_aic flex_jc activeDate' : 'flex flex_fdc flex_shk flex_aic flex_jc'">
                        <div>{{ item.day }}</div>
                        <div>{{ item.date }}</div>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="matchList" >
            <van-collapse v-model="activeNames" @change="matchListChange">
                <van-collapse-item :name="index" class="mb_6" v-for="(item, key, index) in filterData" :key="index">
                    <div slot="title" class="title flex flex_aic"><img class="collapseImg" :src="item[0].games_img_url" alt="">{{ item[0].games_name }} ({{ item.length }})</div>
                    <div class="showBox flex mb_5" v-for="(dom, ind) in item" :key="ind" @click="matchItem(dom)">  
                        <div class="fir-item">
                            <div class="time-and-amount">
                                <div class="time">{{ dom.master_start_time }}</div>
                                <div class="amount">5+</div>
                            </div>
                            <div>
                                <span class="type-word">主</span>
                                {{ dom.master_count }}
                            </div>
                            <div>
                                <span class="type-word pre-7">客</span>
                                {{ dom.slave_count }}
                            </div>
                            <img src="@/assets/img/common/vs.png" alt="" class="imsc" />
                        </div>
                        <div class="pow">
                            <div class="second-item">
                                <div>{{ dom.master_info }}</div>
                                <div>{{ dom.master_consult }}</div>
                            </div>
                            <div class="third-item">
                                <div>{{ dom.slave_info }}</div>
                                <div>{{ dom.slave_consult }}</div>
                            </div>
                        </div>                                  
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <EmptyPage v-show="matchFilter.length == 0" />
    </div>
</template>
<script>
import { Interface } from '@/assets/script/api/Interface.js'
import moment from 'moment';

export default {
    name: 'home',
    data () {
        return {
            loading: false,
            error: false,
            finished: false,
            itmeBlock: [],
            isFirstEnter: false,
            activeNames: [0],
            dateIndex: 0,
            matchTabbar: [],
            matchTabbarIndex: 0,
            pageContent: {
                page: 1,
                pageSize: 10
            },
            interface: null,
            interfaceParameters: {},
            bannerList: [],
            tournamentlevel: [],
            matchFilter: [],
            filterData: [],
            time: '',
            isFirstEnter: false,
        }
    },
    created(){
        this.isFirstEnter = true;
    },
    beforeRouteEnter (to, from, next) {
        if(from.name == 'makeRecord' || from.name == 'bankerList'){
            to.meta.isBack = true;
        }
        next();
    },
    activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
            this.initData();
        }
        this.$route.meta.isBack = false;
        this.isFirstEnter = false;
    },
    methods:{
        initData(){
            this.getBannerData();
            this.pushBlockItems();
            this.tournamentList();
            this.dailyEvents();
        },
        back(){},
        history(){
            this.$router.push({
                name: 'makeRecord'
            })
        },
        // 获取banner数据
        getBannerData(){
            this.$request({
                ...Interface.banner,
                data: this.pageContent
            }, res => {
                this.bannerList = res.data.record;
            })
        },
        // 获取赛事级别
        tournamentList(){
            this.$request({
                ...Interface.gamesLevelgames_level
            }, res => {
                this.matchTabbar = res.data.record;
            })
        },
        // 获取每日赛事
        dailyEvents(time){
            this.time = time
            this.$request({
                ...Interface.getgamespointsall,
                data: {
                    create_time: this.time 
                }
            }, res => {
                this.matchFilter = res.data.record;
                this.filterData = this.contestSelection()
            })
        },
        // 获取近一周时间
        pushBlockItems(){
            let blockItems = [];
            let now = moment().format('MM-DD');
            blockItems.push({
                day: '今天',
                date: now,
            });
            for (let i = 1; i <= 6; i++) {
                let date = moment()
                    .add(i, 'days')
                    .format('MM-DD');
                let d = moment()
                    .add(i, 'days')
                    .format('d');
                let create_time = moment()
                    .add(i, 'days')
                    .unix();

                switch (Number(d)) {
                    case 0:
                    d = '周日';
                    break;
                    case 1:
                    d = '周一';
                    break;
                    case 2:
                    d = '周二';
                    break;
                    case 3:
                    d = '周三';
                    break;
                    case 4:
                    d = '周四';
                    break;
                    case 5:
                    d = '周五';
                    break;
                    case 6:
                    d = '周六';
                    break;
                    default:
                    break;
                }
                blockItems.push({
                    day: d,
                    date,
                    create_time,
                });
            }
            this.itmeBlock = blockItems
        },
        onChange(index){
            console.log(index)
        },
        matchListChange(index){
            console.log(index)
        },
        selectDate(data, index){
            this.dateIndex = index;
            this.dailyEvents(data.create_time)
        },
        selectTabbar(data, index){
            if(data.id == 7){
                this.interface = Interface.getgamespointsall;
                this.interfaceParameters = {
                    create_time: this.time
                }
            }else{
                this.interface = Interface.get_games_points_filter;
                this.interfaceParameters = {
                    games_level_id: data.id
                }
            }
            this.$request({
                ...this.interface,
                data: this.interfaceParameters
            }, res => {
                this.matchFilter = res.data.record;
                this.filterData = this.contestSelection()
                console.log(this.filterData);
            })
            this.matchTabbarIndex = index
        },
        // 筛选ID分类数据
        contestSelection(){
            var arr = {};
            var allId = this.matchFilter.map((item, index)=>{
                return item.games_id
            })
            var filterId = this.unique(allId);
            for(var i=0; i<filterId.length; i++){
                if(this.matchFilter[i].games_id == filterId[i]){
                    arr[filterId[i]] = []
                    arr[filterId[i]].push(this.matchFilter[i])
                }
            }
            return arr
        },
        // 数组去重
        unique(arr){            
            for(var i=0; i<arr.length; i++){
                for(var j=i+1; j<arr.length; j++){
                    if(arr[i] == arr[j]){     
                        arr.splice(j,1);
                        j--;
                    }
                }
            }
            return arr;
        },
        matchItem(item){
            this.$router.push({
                name: 'bankerList',
                query: {
                    id: item.id 
                }
            })
        },
        bannergopage(data){
            this.$router.push({
                path: data.addr_url
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .wrapper{
        .center{
            img{
                width: 24px;
                height: 24px;
            }
        }
        .swipe_lunbo{
            position: relative;
            div{
                width: 100%;
                height: 168px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }  
        }
        .matchTabbar{
            height: 48px;
            background:linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%);
            li{
                position: relative;
                width: 100px;
                height: 100%;
                text-align: center;
                line-height: 48px;
                color:rgba(255,255,255,0.7);
                font-size: 16px;
                &:nth-of-type(1){
                    margin-left: 16px;
                }
                &.active{
                    color: #fff;
                }
                img{
                    position: absolute;
                    left: 50%;
                    margin-left: -5px;
                    bottom: 0;
                    width: 10px;
                    height: 6px;
                }
            }
        }
        .blockList {
            background-color: rgba(26, 36, 46, 1);
            padding: 0px 16px 8px;
            overflow-x: auto;
            .listWrap {
                height: 100%;
                width: auto;
                white-space: nowrap;
                li{
                    width: 75px;
                    height: 88px;
                    vertical-align: middle;
                    border-radius: 5px;
                    margin-right: 8px;
                    line-height: 1.8;
                    font-size: 14px;
                    background: unset;
                    color: rgba(98, 105, 112, 1);
                    border: 1px solid rgba(98, 105, 112, 1);
                    transition: all ease 0.5s;
                    &.activeDate{
                        background: linear-gradient(180deg,rgba(35,215,235,1) 0%,rgba(6,174,208,1) 100%);
                        color: #fff;
                    }
                }
            }
        }   
        .matchList{
            .title{
                color: #fff;
                .collapseImg{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 8px;
                }
            }  
            .showBox{
                width: 100%;
                height: 100px;
                background: #fff;
                .fir-item {
                    flex: 1;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 16px;
                    padding-right: 8px;
                    position: relative;
                    padding-left: 19px;
                    padding-top: 16px;
                    background: #fff;
                    .time-and-amount {
                        &:after {
                            content: '';
                            clear: both;
                        }
                        height: 20px;
                        margin-bottom: 2px;
                        }
                        .time {
                        color: rgba(41, 50, 60, 0.39);
                        font-size: 14px;
                        float: left;
                        }
                        .amount {
                        width: 26px;
                        height: 17px;
                        border-radius: 19px;
                        background-color: #ff9000;
                        line-height: 17px;
                        text-align: center;
                        font-size: 12px;
                        color: #fff;
                        float: right;
                        }
                    .imsc {
                        width: 58px;
                        height: 22px;
                        position: absolute;
                        right: 5px;
                        bottom: 5px;
                    }
                    .type-word {
                        width: 14px;
                        height: 14px;
                        background-color: #485563;
                        color: #fff;
                        font-size: 12px;
                        transform: scale(0.8);
                        display: inline-block;
                        vertical-align: top;
                        padding: 3px 4px 6px 4px;
                        border-radius: 3px;
                        text-align: center;
                        margin-right: 4px;
                    }
                    .pre-7 {
                        opacity: 0.7;
                    }
                }
                .pow {
                    flex: 1;
                    background: linear-gradient(to right, rgba(35, 215, 235, 1) 0%, rgba(6, 174, 208, 1) 100%);
                    border-top-left-radius: 12px;
                    .second-item {
                        width: 50%;
                        height: 100px;
                        display: inline-block;
                        vertical-align: middle;
                        border-radius: 4px;
                        border-top-left-radius: 12px;
                        text-align: center;
                        color: #fff;
                        & > div:first-child {
                            margin-top: 24px;
                            opacity: 0.79;
                            font-size: 14px;
                            margin-bottom: 13px;
                        }
                        & > div:last-child {
                            font-size: 16px;
                        }
                    }
                    .third-item {
                        width: 50%;
                        height: 100px;
                        display: inline-block;
                        vertical-align: middle;
                        background: linear-gradient(to bottom, rgba(56, 67, 79, 1) 0%, rgba(32, 40, 50, 1) 100%);
                        text-align: center;
                        color: #fff;
                        border-top-left-radius: 12px;
                        & > div:first-child {
                            opacity: 79;
                            margin-top: 22px;
                            font-size: 14px;
                            margin-bottom: 15px;
                        }
                        & > div:last-child {
                            font-size: 16px;
                        }
                    }
                }
            }       
        }   
    }
    .blockList-enter-active, .blockList-leave-active {
        transition: all .5s;
    }
    .blockList-enter, .blockList-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(-100%)
    }
</style>
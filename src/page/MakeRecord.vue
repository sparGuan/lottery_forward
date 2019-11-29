<template>
    <div class="makeRecord">
        <Gheader bgcolor="linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%)" @go-back="back" :box_bottom="true" :indexback="false">
            <div class="center flex flex_aic" slot="top_select">
                <ul class="selectTab flex">
                    <li @click="selectTab(1)">投注</li>
                    <li @click="selectTab(2)">庄盘</li>
                    <span :class="headerIndex == 2 ? 'activeHeader' : ''" ></span>
                </ul>
            </div>
        </Gheader>
        <ul class="matchTabbar flex" :style="{ top: headerH + 'px' }">
            <li @click="selectTabbar(item, index)" :class="matchTabbarIndex == index ? 'active' : ''" v-for="(item, index) in matchTabbar" :key="index">{{ item }}
                <img v-if="matchTabbarIndex == index" src="@/assets/img/common/triangle.png" alt="">
            </li>
        </ul>
        <div class="list_wrap">
            <van-list
                v-if="vanlist"
                v-model="loading"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
                finished-text="没有更多了"
                :finished="finished"
            >
                <EventPanel :bettingAndBuilding="bettingAndBuilding" :info="item" @receiveprize="receiveprize" v-for="(item, index) in eventPanelData" :key="index"/>
             </van-list>
        </div>
        <div @touchmove.prevent>
            <ConfirmInformation v-if="confirmInformationFlag" @closeConfirmInformation="closeConfirmInformation" @submitConfirmInformation="submitConfirmInformation" :confirmData="confirmData" />
        </div>
    </div>
</template>

<script>
import { Interface } from '@/assets/script/api/Interface.js'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'makeRecord',
    data(){
        return {
            loading: false,
            error: false,
            finished: false,
            headerIndex: 1,
            matchTabbar: ['全部', '待开奖', '已中奖', '未中奖'],
            matchTabbarIndex: 0,
            bettingAndBuilding: 'betting',
            eventPanelData: [],
            confirmInformationFlag: false,
            interfaceSharing: null,
            pageContent: {
                page: 1,
                pageSize: 20,
                status: '',
                is_win: ''
            },
            confirmData:{},
            intermediateData: {},
            selectionInterface: null,
            receiveInterface: null,
            receiveInterfaceParameter: {},
            isFirstEnter: true,
            vanlist: true
        }
    },  
    computed: {
        ...mapState({
            headerH: (state)=> state.StatusBarHeight
        })
    },
    created(){
        this.isFirstEnter = true;
        this.selectionInterface = Interface.player_order_record;
    },
    beforeRouteEnter (to, from, next) {
        if(from.name == 'bankerRoom'){
            to.meta.isBack = true;
        }
        next();
    },
    activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
            // this.getBetsData();
        }
        this.$route.meta.isBack = false;
        this.isFirstEnter = false;
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        onLoad(){
            this.getBetsData();
        },
        selectTab(index){
            this.vanlist = false
            this.headerIndex = index;
            this.matchTabbarIndex = 0;
            this.eventPanelData = [];
            this.loading = this.finished = false;
            if(index == 1){
                this.matchTabbar = ['全部', '待开奖', '已中奖', '未中奖'];
                this.bettingAndBuilding = 'betting';
                this.selectionInterface = Interface.player_order_record;
                this.pageContent = {
                    page: 1,
                    pageSize: 20,
                    status: '',
                    is_win: ''
                }
            }else{
                this.matchTabbar = ['全部', '待开奖', '已开奖'];
                this.bettingAndBuilding = 'building';
                this.selectionInterface = Interface.bankerOrderRecordBanker_order_record;
                this.pageContent = {
                    page: 1,
                    pageSize: 20,
                    status: 0,
                }
            }
            this.$nextTick(()=>{
                this.vanlist = true;
            })
        },
        selectTabbar(data, index){
            this.vanlist = false
            this.matchTabbarIndex = index;
            this.eventPanelData = [];
            this.loading = this.finished = false;
            if(this.bettingAndBuilding == 'betting'){
                this.pageContent = {
                    page: 1,
                    pageSize: 20,
                }
                switch(index){
                    case 0: 
                        this.pageContent.status = '';
                        this.pageContent.is_win = '';
                        break;
                    case 1: 
                        this.pageContent.status = this.pageContent.is_win = 0;
                        break;
                    case 2: 
                        this.pageContent.status = 2;
                        this.pageContent.is_win = 1;
                        break;
                    case 3: 
                        this.pageContent.status = 2;
                        this.pageContent.is_win = 0;
                        break;
                }
            }else if(this.bettingAndBuilding == 'building'){
                this.pageContent = {
                    page: 1,
                    pageSize: 20
                }
                switch(index){
                    case 0: 
                        this.pageContent.status = 0;
                        break;
                    case 1: 
                        this.pageContent.status = 1;
                        break;
                    case 2: 
                        this.pageContent.status = 2;
                        break;
                }
            }
            this.$nextTick(()=>{
                this.vanlist = true;
            })
        },
        receiveprize(data){
            this.intermediateData = data;
            // 投注
            if(this.bettingAndBuilding == 'betting'){
                if(data.is_receive == 0){
                    this.confirmData = {
                        btnFlag: data.is_receive,
                        title: "确认领奖",
                        desc: data.master_count + 'vs' + data.master_count,
                        name: "胜平负",
                        data: [
                            { key: '编号', value: data.id },
                            { key: '比分', value: data.score  },
                            { key: '中奖金额', value: data.amount * data.consult + ' ANT' },
                            { key: '手续费('+ data.commission +'%)', value: data.commission/100 * data.amount * data.consult + " ANT" }
                        ]
                    }
                }else if(data.is_receive == 1){
                    this.confirmData = {
                        btnFlag: data.is_receive,
                        title: "中奖信息",
                        data: [
                            { key: '中奖金额', value: data.amount * data.consult + ' ANT' },
                            { key: '手续费('+ data.commission +'%)', value: data.commission/100 * data.amount * data.consult + " ANT" },
                            { key: '领取时间', value: this.transformTime(data.collect_time) }
                        ]
                    }
                }
            // 庄盘 
            }else if(this.bettingAndBuilding == 'building'){
                this.confirmData = {
                    btnFlag: data.is_receive,
                    title: "确认管理资金",
                    data: [
                        { key: '编号', value: data.created_by },
                        { key: '比分', value: data.score  },
                        { key: data.bet_to_master_amount+'@'+data.master_consult+"x", value: data.result == 0 ? '-' +(data.bet_to_master_amount*data.master_consult) + ' ANT' : '- -', name: '主胜', bg: '1'  },
                        { key: data.bet_to_flag_amount+'@'+data.flat_consult+"x", value: data.result == 1 ? '-' +(data.bet_to_flag_amount*data.flat_consult) + ' ANT' : '- -', name: '平仓', bg: '2'  },
                        { key: data.bet_to_slave_amount+'@'+data.slave_consult+"x", value: data.result == 2 ? '-' +(data.bet_to_slave_amount*data.slave_consult) + ' ANT' : '- -', name: '客胜', bg: '2'  },
                        { key: '庄盘总资金', value: data.pool_amount + ' ANT'  },
                        { key: '手续费('+ data.commission +'%)', value: '-' + (data.commission/100 * data.pool_amount) + " ANT" },
                        { key: '提现金额', value: data.pool_amount - (data.commission/100 * data.pool_amount) - this.deduction(data) + ' ANT'},
                    ]
                }
                if(data.is_receive == 0){
                    
                }else if(data.is_receive == 1){
                    this.confirmData.title = '管理资金详情';
                    this.confirmData.data.push({ key: '领取时间', value: this.transformTime(data.collect_time) })
                }
            }
            this.confirmInformationFlag = true

            console.log(data)
        },
        // 计算庄家扣除的ANT
        deduction(data){
            var sum = 0;
            if(data.result == 0){
                sum = data.bet_to_master_amount * data.master_consult
            }else if(data.result == 1){
                sum = data.bet_to_flag_amount * data.flat_consult
            }else if(data.result == 2){
                sum = data.bet_to_slave_amount * data.slave_consult
            }
            return sum
        },
        // 确认数量控件
        closeConfirmInformation(){
            this.confirmInformationFlag = false;
        },
        submitConfirmInformation(){
            if(this.bettingAndBuilding == 'betting'){
                this.receiveInterface = Interface.playersreceivebonus;
                this.receiveInterfaceParameter = {
                    id: this.intermediateData.id
                }
            }else if(this.bettingAndBuilding == 'building'){
                this.receiveInterface = Interface.banker_order_record;
                this.receiveInterfaceParameter = {
                    id: this.intermediateData.id
                }
            }
            this.$request({
                ...this.receiveInterface,
                data: this.receiveInterfaceParameter
            }, res => {
                this.confirmInformationFlag = false;
                this.intermediateData.is_receive = 1;
            },err => {
               console.log(err, "玩家领取接口失败")
            })
        },
        // 获取玩家下注数据
        getBetsData(){
            this.$request({
                ...this.selectionInterface,
                data: this.pageContent
            }, res => {
                this.pageContent.page += 1;
                this.loading = false;
                this.finished = res.data.record.length < this.pageContent.pageSize;
                this.eventPanelData = this.eventPanelData.concat(res.data.record);
            },err => {
                this.pageContent.page = 1;
                this.loading = false;
                this.error = true;
            })
        },
        // 时间格式转换
        transformTime(timestamp = +new Date()) {
            if (timestamp) {
                var time = new Date(parseInt(timestamp)*1000);
                var y = time.getFullYear(); 
                var M = time.getMonth() + 1;
                var d = time.getDate(); 
                var h = time.getHours(); 
                var m = time.getMinutes(); 
                var s = time.getSeconds();
                return this.format(y) + '-' + this.format(M) + '-' + this.format(d) + ' ' + this.format(h) + ':' + this.format(m);
            } else {
                return '';
            }
        },
        // 处理前缀
        format(data){
            if(data < 10){
                return '0' + data
            }else{
                return data
            }
        }, 
    }
}
</script>

<style lang="less" scoped>
    .makeRecord{
        font-family: 'PingFangSC-Regular','PingFang SC';
        .selectTab{
            position: relative;
            width: 138px;
            height: 38px;
            background:rgba(41,50,60,1);
            border-radius: 19px;
            li{
                position: relative;
                z-index: 3;
                width: 50%;
                height: 100%;
                text-align: center;
                line-height: 38px;
                font-size:16px;
                font-weight: 400;
            }
            span{
                position: absolute;
                left: 2px;
                top: 2px;
                z-index: 1;
                width: 68px;
                height: 34px;
                background:linear-gradient(153deg,rgba(35,215,235,1) 0%,rgba(6,174,208,1) 100%);
                border-radius: 18px;
                -webkit-transition: left .5s;
                transition: left .5s;
                &.activeHeader{
                    left: 68px;
                }
            }
        }
        .matchTabbar{
            position: fixed;
            left: 0;
            z-index: 5;
            width: 100%;
            height: 48px;
            background:linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%);
            li{
                position: relative;
                width: 25%;
                height: 100%;
                text-align: center;
                line-height: 48px;
                color:rgba(255,255,255,0.7);
                font-size: 16px;
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
        .list_wrap{
            padding-top: 48px;
            margin: 8px 16px;
            
        }
    }
</style>

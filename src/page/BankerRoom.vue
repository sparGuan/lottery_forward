<template>
    <div class="bankerRoom">
        <Gheader bgcolor="linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%)" @go-back="back" :box_bottom="true" @showImg="history" :showRight="true">
            <div class="center flex flex_aic" slot="top_select">
                <span class="title fs_18 fb color_ff">123456的庄</span>
            </div>
        </Gheader>
        <TopWindow :record="record"></TopWindow>
        <ul class="matchTabbar flex mb_8">
            <li @click="selectTabbar(item, index)" :class="matchTabbarIndex == index ? 'active' : ''" v-for="(item, index) in matchTabbar" :key="index">{{ item.name }}({{ item.num }})
                <img v-if="matchTabbarIndex == index" src="@/assets/img/common/triangle.png" alt="">
            </li>
        </ul>
        <div class="bettingList mt_8">
            <van-collapse v-model="activeNames" @change="matchListChange">
                <van-collapse-item :name="index" v-for="(item, index) in record.gamesPlay" :key="index">
                    <div slot="title" class="title">
                        <div class="tradingRules flex flex_aic">
                            <span class="name fs_16">{{ item.name }}</span>
                            <span class="number ml_8">{{ $route.query.isActive == 2 ? 0 : roomInfo.people }}</span>
                        </div>
                        <div class="probability fs_12 mt_2">参考赔率：主@{{ item.master_consult }}，平@{{ item.flat_consult }}，客@{{ item.slave_consult }}</div>
                    </div>
                    <ul v-show="$route.query.isActive != 2" class="wrapper flex">
                        <li class="win flex1 flex flex_fdc flex_jc flex_aic" @click="inputEvent('bets', 0, roomInfo.id)">
                            <p class="odds flex flex_aic fs_16 fb color_ff">
                                {{ roomInfo.master_consult }}
                                <span>主胜</span>
                            </p>
                            <p class="mayCast mt_16 fs_14">{{ roomInfo.master_bet_amount }} ANT</p>
                        </li>
                        <li class="flat flex1 flex flex_fdc flex_jc flex_aic" @click="inputEvent('bets', 1, roomInfo.id)">
                            <p class="odds flex flex_aic fs_16 fb">
                                {{ roomInfo.flat_consult }}
                                <span>平局</span>
                            </p>
                            <p class="mayCast mt_16 fs_14">{{ roomInfo.flat_bet_amount }} ANT</p>
                        </li>
                        <li class="negative flex1 flex flex_fdc flex_jc flex_aic" @click="inputEvent('bets', 2, roomInfo.id)">
                            <p class="odds flex flex_aic fs_16 fb color_ff">
                                {{ roomInfo.slave_consult }}
                                <span>客胜</span>
                            </p>
                            <p class="mayCast mt_16 fs_14">{{ roomInfo.slave_bet_amount }} ANT</p>
                        </li>
                    </ul>
                    <div class="bankerBtn color_ff" @click="inputEvent('banker')" v-show="($route.query.isActive == 2) && bankerFlag" >我来做庄</div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <van-popup
            v-model="inputBettingFlag"
            closeable
            position="bottom"
            z-index="1"
            :style="{ height: 0 }"
            :close-on-click-overlay = "false"
        />
        <div @touchmove.prevent>
            <transition name="input">
                <InputBetting v-if="inputBettingFlag" @confirmation="confirmation"  @closeInputBetting="closeInputBetting" :parameter="parameter"></InputBetting>
            </transition>
        </div>
        <div @touchmove.prevent>
            <ConfirmInformation v-if="confirmInformationFlag" @closeConfirmInformation="closeConfirmInformation" @submitConfirmInformation="submitConfirmInformation" :confirmData="confirmData" />
        </div>
    </div>
</template>

<script>
import { Interface } from '@/assets/script/api/Interface.js'
export default {
    name: 'bankerRoom',
    data(){
        return {
            matchTabbar: [
                { name:'全部', num: 0 }, 
                { name:'全场', num: 0 }, 
                { name:'上半场', num: 0 }
            ],
            matchTabbarIndex: 0,
            activeNames: [0],
            inputBettingFlag: false,
            confirmInformationFlag: false,
            parameter: {},
            record: [],
            roomInfo: {},
            placeAnOrder: {},
            BetType: '',
            BetTypeData: null,
            interfaceSharing: null,
            interfaceParameters: {},
            confirmData: {},
            isFirstEnter: true,
            bankerFlag: true,
            timer: null
        }
    },
    created(){
        this.isFirstEnter = true;
    },
    beforeRouteEnter (to, from, next) {
        if(from.name == 'makeRecord'){
            to.meta.isBack = true;
        }
        next();
    },
    activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
            this.getMatchDetail();
        }
        this.$route.meta.isBack = false;
        this.isFirstEnter = false;
    },
    deactivated(){
        window.clearInterval(this.timer)
    },
    methods: {
        back(){
            window.clearInterval(this.timer)
            this.$router.go(-1);
        },
        history(){
            this.$router.push({
                name: 'makeRecord'
            })
        },
        selectTabbar(data, index){
            this.matchTabbarIndex = index
        },
        matchListChange(index){
            // console.log(index)
        },
        // 获取赛事详情
        getMatchDetail(){
            this.$request({
                ...Interface.get_games_points_id,
                data: {
                    id: this.$route.query.games_point_id 
                }
            }, res => {
                res.data.record[0].gamesPlay = JSON.parse(decodeURI(res.data.record[0].gamesPlay));
                this.record = res.data.record[0];
                if(this.$route.query.isActive != 2){
                    this.roomData()
                }
            })
        },
        // 获取房间数据
        roomData(){
            this.$request({
                ...Interface.banker_disc,
                data: {
                    games_room_id: this.$route.query.games_room_id 
                }
            }, res => {
                this.roomInfo = res.data.record[0];
                this.intervalLoading();
            })
        },
        intervalLoading(){
            this.timer = window.setInterval(()=>{
                this.$request({
                    ...Interface.banker_disc,
                    data: {
                        games_room_id: this.$route.query.games_room_id 
                    }
                }, res => {
                    this.roomInfo = res.data.record[0];
                })
            },3000)
        },
        // 输入 数量组件
        inputEvent(flag, bet_to, banker_disc_id){
            if(flag == 'bets'){
                this.parameter = {
                    type: 'bets',
                    bet_to,
                    banker_disc_id
                }
            }else if(flag == 'banker'){
                this.parameter = {
                    type: 'banker'
                }
            }
            if(this.$route.query.isActive != 0){
                this.inputBettingFlag = true;
            }
        },
        closeInputBetting(){
            this.inputBettingFlag = false;
        },
        // 确认 数量组件
        closeConfirmInformation(){
            this.confirmInformationFlag = false;
        },
        submitConfirmInformation(){
            //   玩家下单、庄下单
            if(this.BetType == 'bets'){
                this.interfaceSharing = Interface.create_bets_order;
                this.interfaceParameters = {
                    rule: 0,
                    banker_disc_id: this.parameter.banker_disc_id,
                    amount: this.BetTypeData.inputNum,
                    bet_to: this.parameter.bet_to
                }
            }else if(this.BetType == 'banker'){
                this.interfaceSharing = Interface.roomCreate_order;
                this.interfaceParameters = {
                    rule: 0,
                    amount: this.BetTypeData.inputNum,
                    games_point_id: this.$route.query.games_point_id,
                    master_consult: this.BetTypeData.win,
                    slave_consult: this.BetTypeData.flat,
                    flat_consult: this.BetTypeData.negative
                }
            }
            this.$request({
                ...this.interfaceSharing,
                data: this.interfaceParameters
            }, res => {
                this.closeConfirmInformation();
                this.closeInputBetting();
                this.bankerFlag = false;
                // this.roomData();
                console.log(res, "庄下单成功")
            },err => {
                console.log(err, "庄下单失败")
            })
        },
        // 确认输入数量成功回调
        confirmation(flag, obj){
            console.log(flag, obj)
            if(flag == 'bets'){

            }else if(flag == 'banker'){
                this.confirmData = {
                    btnFlag: 0,
                    title: "请确认信息",
                    desc: this.record.master_count + 'vs' + this.record.master_count,
                    name: "胜平负",
                    data: [
                        { key: this.record.master_count + ' 胜', value: obj.win },
                        { key: '平局', value: obj.flat  },
                        { key: this.record.slave_count + ' 胜', value: obj.negative },
                        { key: '备用金', value: obj.inputNum + " ANT" }
                    ]
                }
            }
            this.BetType = flag;
            this.BetTypeData = obj;
            this.confirmInformationFlag = true;
        }
    }
}
</script>

<style lang="less" scoped>
    .bankerRoom{
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
        .bettingList{
            .title{
                color: #fff;
                .tradingRules{
                    .number{
                        width: 36px;
                        height: 18px;
                        background: rgba(26,36,46,1);
                        border-radius: 9px;
                        font-size: 11px;
                        text-align: center;
                        line-height: 18px;
                    } 
                }
                .probability{
                    color:rgba(255,255,255,.7);
                }
            }  
            .wrapper{
                height: 100px;
                li{
                    height: 100%;
                    .odds{
                        span{
                            font-size: 11px;
                            line-height: 18px;
                            padding: 0px 8px;
                            border: 1px solid #fff;
                            border-radius: 11px;
                            margin-left: 8px;
                            font-weight: 400;
                        }
                    }
                    .mayCast{
                        color: rgba(255,255,255,.79);
                    }
                }
                .win{
                    background:linear-gradient(153deg,rgba(35,215,235,1) 0%,rgba(6,174,208,1) 100%);
                }
                .flat{
                    background:rgba(255,255,255,1);
                    color:rgba(41, 50, 60, 1);
                    .odds{
                        span{
                            border: 1px solid rgba(41,50,60,1);
                            color:rgba(41,50,60,1);
                        }
                    }
                    .mayCast{
                        color:rgba(41,50,60,.79);
                    }
                }
                .negative{
                    background:linear-gradient(135deg,rgba(56,67,79,1) 0%,rgba(32,40,50,1) 100%);
                }
            }
        }
        .bankerBtn{
            // position: fixed;
            // bottom: 0;
            // left: 0;
            width: 375px;
            height: 48px;
            background: rgba(89,99,108,1);
            font-size:16px;
            line-height: 48px;
            text-align: center;
        }
    }
</style>
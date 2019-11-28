<template>
    <div class="bankerList">
        <Gheader bgcolor="linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%)" @go-back="back" :box_bottom="true" @showImg="history" :showRight="true">
            <div class="center flex flex_aic" slot="top_select">
                <span class="title fs_18 fb color_ff">庄家列表</span>
            </div>
        </Gheader>
        <TopWindow v-show="pageShow" :record="record"></TopWindow>
        <div v-show="pageShow" class="Market flex flex_aisb flex_aic p0_16">
            <div class="MarketLeft flex1">
                <p class="color_ff fs_16">市场庄家({{ totalRecord }})</p>
                <span class="fs_12">参考赔率：主@{{ record.master_consult }}，平@{{ record.flat_consult }}，客@{{ record.slave_consult }}</span>
            </div>
            <div class="MarketRight">
                <span class="color_ff fs_16" @click="bankerRoom" v-if="mankerBtnShow">我来做庄</span>
            </div>
        </div>
        <div v-show="pageShow" class="inputFill flex flex_aic flex_jc">
            <input type="text" @focus="inputFocus" @blur="inputBlur" @input="inputData" v-model="inputValue">
            <div :class="seachMove ? 'search active flex flex_aic fs_14' : 'search flex flex_aic fs_14'">
                <img class="flex_shk" src="@/assets/img/common/search.png" alt="">
                <span class="flex_shk" v-show="inputValue.length == 0">搜索</span>
            </div>
            <span v-show="seachMove" class="close fs_14" @click="closeInput">取消</span>
        </div>
        <div class="scrollData">
            <van-list
                v-model="loading"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
                finished-text="没有更多了"
                :finished="finished"
                :immediate-check="false"
            >
                <BankerItem v-for="(item, index) in bankerList" :key="index" :info="item"></BankerItem>
            </van-list>
        </div>
    </div>
</template>

<script>
import { Interface } from '@/assets/script/api/Interface.js'
export default {
    name: 'bankerList',
    data(){
        return {
            inputValue: '',
            seachMove: false,
            loading: false,
            error: false,
            finished: false,
            pageContent: {
                page: 1,
                pageSize: 20
            },
            record: {},
            bankerList:[],
            totalRecord: 0,
            pageShow: false,
            mankerBtnShow: false
        }
    },  
    created(){
        this.isFirstEnter = true;
    },
    beforeRouteEnter (to, from, next) {
        if(from.name == 'makeRecord' || from.name == 'bankerRoom'){
            to.meta.isBack = true;
        }
        next();
    },
    activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
            this.bankerList = [];
            this.initData();
        }
        this.$route.meta.isBack = false;
        this.isFirstEnter = false;
    },
    methods: {
        initData(){
            this.getScrollData();
            this.getMatchDetail();
            this.getMyselfRoom();
        },
        back(){
            this.$router.go(-1)
        },
        history(){
            this.$router.push({
                name: 'makeRecord'
            })
        },
        bankerRoom(){
            this.$router.push({
                name: 'bankerRoom',
                query: {
                    games_point_id: this.$route.query.id,
                    isActive: 2,
                }
            })
        },
        inputFocus(){
            this.seachMove = true
        },
        inputBlur(){
            if(this.inputValue.length == 0){
                this.seachMove = false
            }
        },
        closeInput(){
            this.inputValue = ''
            this.seachMove = false;
        },
        onLoad(){
            this.getScrollData()
        },
        // 庄家搜索功能
        inputData(){
            this.bankerList = [];
            this.$request({
                ...Interface.roomgames_roomsearch,
                data: {
                    games_point_id: this.$route.query.id,
                    created_by: this.inputValue,
                    page: 1,
                    pageSize: 10
                }
            }, res => {
                this.totalRecord = res.data.totalRecord;
                this.pageContent.page += 1;
                this.loading = false;
                this.finished = res.data.record.length < this.pageContent.pageSize;
                this.bankerList = this.bankerList.concat(res.data.record);
            },err => {
                this.loading = false;
                this.error = true;
            })
        },
        getMyselfRoom(){
            this.$request({
                ...Interface.roomgames_roomsearch,
                data: {
                    games_point_id: this.$route.query.id,
                    page: 1,
                    pageSize: 10
                }
            }, res => {
                this.mankerBtnShow = res.data.record.length == 0;
                this.bankerList.unshift(res.data.record[0])
            })
        },
        // 获取所有庄家房间
        getScrollData(){
            this.pageContent.games_point_id = this.$route.query.id;
            this.$request({
                ...Interface.roomGames_room,
                data: this.pageContent
            }, res => {
                this.totalRecord = res.data.totalRecord;
                this.pageContent.page += 1;
                this.loading = false;
                this.finished = res.data.record.length < this.pageContent.pageSize;
                this.bankerList = this.bankerList.concat(res.data.record);
                
            },err => {
                this.pageContent.page = 1;
                this.loading = false;
                this.error = true;
            })
        },
        // 获取赛事详情
        getMatchDetail(){
            this.$request({
                ...Interface.get_games_points_id,
                data: {
                    id: this.$route.query.id 
                }
            }, res => {
                this.pageShow = true;
                console.log(res, "获取赛事详情")
                this.record = res.data.record[0]
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .bankerList{
        font-family: 'PingFangSC-Regular, PingFang SC';
        .Market {
            width: 375px;
            height: 60px;
            background: linear-gradient(90deg,rgba(41, 50, 60, 1) 0%,rgba(72, 85, 99, 1) 100%);
            .MarketLeft {
                span {
                    display: block;
                    padding-top: 3px;
                    color: rgba(255, 255, 255, 0.7);
                }
            }
            .MarketRight {
                span {
                    display: block;
                    width: 94px;
                    height: 34px;
                    background: linear-gradient(153deg, rgba(35, 215, 235, 1) 0%,rgba(6, 174, 208, 1) 100%);
                    border-radius: 17px;
                    line-height: 34px;
                    text-align: center;
                }
            }
        }  
        .inputFill{
            position: relative;
            width: 100%;
            height: 52px;
            input{
                box-sizing: border-box;
                padding: 0 50px 0 30px;
                width: 343px;
                height: 36px;
                border: 0;
                outline: 0;
                background: rgba(89, 99, 108, 1);
                border-radius: 18px;
                font-size: 14px;
            }
            .search{
                position: absolute;
                top: 17px;
                left: 161px;
                color: rgba(255,255,255,0.7);
                transition: all 0.2s;
                img{
                    width: 18px;
                    height: 18px;
                    margin-right: 6px;
                }
                span{
                    margin-top: -1px;
                }
                &.active{
                    left: 25px;
                }
            }
            .close{
                position: absolute;
                top: 16px;
                right: 30px;
                color: rgba(6, 174, 208, 1);
            }
        }
        .scrollData{
            width: 100%;
        }
    }
</style>

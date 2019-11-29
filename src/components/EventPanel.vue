<template>
    <div :class="{list:true, betting: bettingAndBuilding == 'betting'}">
        <div class="list_top flex">
            <div class="list_top_item line flex flex_jc color_ff">
                <img class="mr_8" :src="info.master_img_url | imgurl" alt="">
                <p class="fs_16 color_ff">{{ info.master_count }}</p>
            </div>
            <div class="list_top_item flex flex_jc color_ff">
                <img class="mr_8" :src="info.slave_img_url | imgurl" alt="">
                <p class="fs_16 color_ff">{{ info.slave_count }}</p>
            </div>
        </div>
        <div class="list_content flex flex_jcsb pt_10 pb_12">
            <div class="list_content_left fs_16 fb" v-if="bettingAndBuilding == 'betting'">
                <i v-if="info.bet_to == 0">{{ info.master_count }}</i>
                <i v-if="info.bet_to == 1">平局</i>
                <i v-if="info.bet_to == 2">{{ info.slave_count }}</i>
                @{{ info.consult }}
                <span>胜平负</span>
            </div>
            <div class="list_content_left fs_16 fb" v-if="bettingAndBuilding == 'building'">
                {{ info.name }} <span>胜平负</span>
            </div>
            <div v-show="bettingAndBuilding == 'building'" :class="info.result == null ? 'list_content_right fs_16 fb' : 'list_content_right fs_16 fb greenColor'" @click="jumpRoom">
                {{ info.result == null ? '待开奖' : '已开奖' }}
                <img v-if="info.result == null" src="@/assets/img/common/more.png" alt="">
            </div>
        </div>

        <div class="container pb_16">
            <div v-if="bettingAndBuilding == 'building'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">{{ info.master_count }} <span>胜</span></div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{ info.master_consult }}</div>
            </div>
            <div v-if="bettingAndBuilding == 'building'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">平局</div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{ info.flat_consult }}</div>
            </div>
            <div v-if="bettingAndBuilding == 'building'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">{{ info.slave_count }} <span>胜</span></div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{ info.slave_consult }}</div>
            </div>
            <div v-if="bettingAndBuilding == 'betting'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">编号</div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{ info.id }}</div>
            </div>
             <div v-if="bettingAndBuilding == 'betting'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">金额</div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{ info.amount * info.consult  }} ANT</div>
            </div>
            <div v-if="bettingAndBuilding == 'building'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">备用金</div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{info.amount}} ANT</div>
            </div>
            <div v-if="bettingAndBuilding == 'betting' || bettingAndBuilding == 'building'" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">时间</div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting'}">{{ transformTime(info.create_time) }}</div>
            </div>
            <div v-if="info.result != null" :class="bettingAndBuilding == 'betting' ? 'list_content_row flex flex_aic flex_aic' : 'list_content_row flex flex_jcsb flex_aic'">
                <div class="content_row_item">比分</div>
                <div :class="{content_row_item: true, ml_16: bettingAndBuilding == 'betting', right: true}">
                    <span>{{ info.score.split(":")[0] }}</span> ：<span>{{ info.score.split(":")[1] }}</span>
                </div>
            </div>
            <div class="buttonBtn flex flex_aic fs_16 fb" v-show="bettingAndBuilding == 'betting'" @click="jumpRoom">
                <span v-if="info.result == null">待开奖</span>
                <span class="active" v-if="info.is_win == 1">已中奖</span>
                <span v-if="info.result != null && info.is_win == 0">未中奖</span>
                <img v-if="info.result == null" src="@/assets/img/common/more.png" alt="">
            </div>
        </div> 
        <!-- 领奖按钮 -->
        <div :class="info.is_receive == 0 ? 'list_bottom flex flex_aic flex_jc fs_16 greenColor' : 'list_bottom flex flex_aic flex_jc fs_16'"  @click="receiveprize(info)"
            v-if="(bettingAndBuilding == 'betting' && info.is_win == 1) || 
                  (bettingAndBuilding == 'building' && info.result != null)"
        >
            {{ btnName[bettingAndBuilding][info.is_receive] }}<img :src="info.is_receive == 0 ? require('@/assets/img/common/greenMore.png') : require('@/assets/img/common/more.png')" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventPanel',
    props: [ 'bettingAndBuilding', 'info' ],
    data(){
        return {
            lotteryStatus: {
                '0': "待开奖",
                '1': "已中奖",
                '2': "未中奖"
            },
            btnName: {
                'betting': {
                    '0': "未领奖",
                    '1': "已领奖",
                },
                'building': {
                    '0': "管理资金",
                    '1': "资金详情",
                }
            }
        }
    },
    methods: {
        jumpRoom(){
            if(this.info.result == null){
                this.$router.push({
                    name: 'bankerRoom',
                    query: {
                        games_point_id: this.info.games_point_id,
                        games_room_id: this.info.games_room_id,
                        isActive: this.bettingAndBuilding == 'betting' ? 1 : 0,
                    }
                })
            }
        },
        receiveprize(data){
            this.$emit('receiveprize',data)
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
    .list{
        margin: 0 auto 8px;
        width: 343px;
        border-radius: 5px;
        background:rgba(72,85,99,.5);
        .list_top{
            background:rgba(255,255,255,.2);
            border-radius: 5px 5px 0px 0px;
            .list_top_item{
                width: 50%;
                margin: 13px 0;
                img{
                    width: 23px;
                    height: 22px;
                }
                p{
                    width: 109px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .line{
                border-right: 1px solid rgba(255,255,255,.2);
            }
        }
        .list_content{
            border-bottom: 1px solid #485563;
            margin: 0 16px 0px;
            .list_content_left{
                i{
                    font-style: normal;
                }
                span{
                    display: inline-block;
                    padding: 1px 8px;
                    text-align: center;
                    background:rgba(255,144,0,1);
                    border-radius: 11px;
                    font-size: 11px;
                    color: #fff;
                    margin-left: 8px;
                }
            }
            .list_content_right{
                img{
                    margin-top: -1px;
                    width: 9px;
                    height: 22px;
                }
                 &.greenColor{
                    color:rgba(5, 182, 207, 1);
                }
            }
        }
        .container{
            position: relative;
            .list_content_row{
                margin: 10px 0 0;
                padding: 0 16px;
                .content_row_item{
                    color: rgba(255,255,255,.4);
                    font-size: 14px;
                }
                .content_row_item:last-child{
                    color: rgba(255,255,255,.8);
                }
                .right{
                    span{
                        display: inline-block;
                        padding: 0 6px;
                        background:rgba(255,255,255,1);
                        border-radius: 12px;
                        color: #29323C;
                        font-size: 16px;
                    }
                }
            }
            .buttonBtn{
                position: absolute;
                right: 16px;
                bottom: 16px;
                img{
                    margin-top: -1px;
                    width: 9px;
                    height: 22px;
                }
                .active{
                    color: rgba(5, 182, 207, 1);
                }
            }
        }
        .list_bottom{
            width: 100%;
            height: 48px;
            background:rgba(255,255,255,.8);
            color: #fff;
            border-radius: 0px 0px 5px 5px;
            img{
                width: 22px;
                height: 22px;
            }
            .ativeBtn{
                background: rgba(255,255,255,1);
                color:rgba(5,182,207,1);
            }
            &.greenColor{
                background: rgba(255, 255, 255, 1);
                color:rgba(5, 182, 207, 1);
            }
        }
    }
    .betting{
        .list_content{
            border-bottom: none;
            padding-bottom: 0;
        }
    }
</style>